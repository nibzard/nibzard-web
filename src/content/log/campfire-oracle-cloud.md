---
title: "Campfire Installation Guide for Oracle Cloud + Cloudflare"
description: "Step-by-step installation of Basecamp's Once Campfire on Oracle Cloud Infrastructure with Cloudflare DNS"
date: 2025-08-21
tags: [CHEATSHEET, Oracle Cloud, Cloudflare, Rails, Deployment]
tldr: "Complete guide to installing Basecamp's Once Campfire on Oracle Cloud. Covers memory constraints, firewall layers, asset compilation, and SSL configuration for production deployment."
author: "Nikola Balić"
---

> **⚠️ Performance Warning**: This setup works on Oracle's Always Free VM.Standard.E2.1.Micro but the experience is quite limited due to the very weak CPU (1/8 OCPU). Expect slow page loads, sluggish UI interactions, and lengthy asset compilation times. Consider upgrading to a more powerful instance for production use.

This guide covers installing Basecamp's Once Campfire on Oracle Cloud Infrastructure with Cloudflare DNS. The process involves system setup, dependency installation, database configuration, asset compilation, and firewall management.

## Prerequisites
- Oracle Cloud VM.Standard.E2.1.Micro (1/8 OCPU, 1GB RAM) or larger
- Domain name managed by Cloudflare
- SSH access to your server

**Note**: The Always Free VM.Standard.E2.1.Micro (1/8 OCPU, 1GB memory, 480 Mbps networking) works but is underpowered. Asset compilation will be slow and memory-intensive operations may require patience.

## Key Lessons Learned
1. **Memory Constraints**: Docker builds fail on low-memory VMs - use direct installation instead
2. **Database Choice**: Campfire uses SQLite3 by default, not PostgreSQL
3. **Firewall Layers**: Oracle Cloud has both Security Lists AND instance-level iptables
4. **Asset Compilation**: Rails assets must be precompiled in production
5. **SSL Configuration**: Disable SSL forcing for initial HTTP setup

## Step-by-Step Installation

### 1. Initial System Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install basic dependencies
sudo apt install -y git curl wget build-essential
```

### 2. Clone Campfire Repository

```bash
cd /opt
sudo git clone https://github.com/basecamp/once-campfire.git
sudo chown -R $USER:$USER once-campfire
cd once-campfire
```

### 3. Install Ruby and Dependencies

```bash
# Install Ruby, Node.js, and system libraries
sudo apt install -y ruby-full nodejs npm postgresql-client redis-tools
sudo apt install -y libpq-dev libsqlite3-dev libyaml-dev libffi-dev 
sudo apt install -y libreadline-dev libssl-dev zlib1g-dev libvips-dev

# Install bundler
sudo gem install bundler

# Install Ruby dependencies (this may take several minutes)
bundle config set --local deployment 'true'
bundle config set --local without 'development test'
bundle install
```

### 4. Install and Configure Services

```bash
# Install and start Redis
sudo apt install -y redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Install Nginx
sudo apt install -y nginx
```

### 5. Create Environment Configuration

```bash
# Create .env file
nano .env
```

Add this content (replace with your actual values):
```env
SECRET_KEY_BASE=your_secret_key_here
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
RAILS_ENV=production
DISABLE_SSL=true
CAMPFIRE_HOST=your-domain.com
REDIS_URL=redis://localhost:6379/0
```

Generate secret key:
```bash
openssl rand -hex 64
```

### 6. Database Setup

```bash
# Set environment variables
export RAILS_ENV=production
export DISABLE_SSL=true
unset DATABASE_URL

# Create database directory
mkdir -p storage/db

# Create and migrate database
bundle exec rails db:create
bundle exec rails db:migrate
```

### 7. Compile Assets

```bash
# Precompile assets (this may take several minutes)
bundle exec rails assets:precompile

# Verify assets were created
ls -la public/assets/ | head -10
```

### 8. Create Startup Script

```bash
nano /opt/once-campfire/start_campfire.sh
```

Add this content:
```bash
#!/bin/bash
cd /opt/once-campfire

export RAILS_ENV=production
export DISABLE_SSL=true
export SECRET_KEY_BASE=your_secret_key_here
export VAPID_PUBLIC_KEY=your_vapid_public_key
export VAPID_PRIVATE_KEY=your_vapid_private_key
export CAMPFIRE_HOST=your-domain.com
export REDIS_URL=redis://localhost:6379/0

unset DATABASE_URL
exec bundle exec rails server -b 0.0.0.0 -p 3000
```

```bash
chmod +x /opt/once-campfire/start_campfire.sh
```

### 9. Create Systemd Service

```bash
sudo nano /etc/systemd/system/campfire.service
```

Add this content:
```ini
[Unit]
Description=Campfire Chat Application
After=network.target redis.service
Requires=redis.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/once-campfire
ExecStart=/opt/once-campfire/start_campfire.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable campfire
sudo systemctl start campfire
sudo systemctl status campfire
```

### 10. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/campfire
```

Add this content:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/campfire /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 11. Configure Oracle Cloud Firewall

#### Security List Configuration
1. Go to Oracle Cloud Console
2. Navigate to **Networking** > **Virtual Cloud Networks**
3. Click your VCN, then your subnet
4. Click **Security Lists** > **Default Security List**
5. Add these **Ingress Rules**:
   - **HTTP**: Source CIDR `0.0.0.0/0`, Protocol `TCP`, Port `80`
   - **HTTPS**: Source CIDR `0.0.0.0/0`, Protocol `TCP`, Port `443`

#### Instance-Level Firewall (Critical!)
```bash
# Check current iptables rules
sudo iptables -L -n

# Add rules to allow HTTP/HTTPS (insert before reject rules)
sudo iptables -I INPUT 4 -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 5 -p tcp --dport 443 -j ACCEPT

# Make rules persistent
sudo apt install -y iptables-persistent
sudo netfilter-persistent save
```

### 12. Configure Cloudflare DNS

1. Go to Cloudflare dashboard
2. Navigate to **DNS** settings
3. Add/update A record:
   - **Name**: `@` (or subdomain)
   - **Content**: Your server's public IP
   - **Proxy status**: DNS only (gray cloud) initially
4. Set **SSL/TLS mode** to "Off" for initial testing

### 13. Test Installation

```bash
# Test local access
curl http://localhost/first_run

# Test external access (after firewall configuration)
curl http://your-domain.com/first_run
```

### 14. Complete Setup

1. Open browser and navigate to `http://your-domain.com/first_run`
2. Fill out the setup form:
   - Enter your name
   - Add email address
   - Create password
   - Upload avatar (optional)
3. Submit to create admin account

## Troubleshooting

### Common Issues

**Assets not loading (404 errors):**
```bash
# Recompile assets
export RAILS_ENV=production
bundle exec rails assets:precompile
sudo systemctl restart campfire
```

**Connection refused errors:**
```bash
# Check iptables rules
sudo iptables -L -n | grep -E "80|443"

# Add missing firewall rules
sudo iptables -I INPUT 4 -p tcp --dport 80 -j ACCEPT
```

**Rails errors:**
```bash
# Check service logs
sudo journalctl -u campfire -f

# Check environment variables
sudo systemctl status campfire
```

**Database issues:**
```bash
# Verify SQLite database exists
ls -la storage/db/
# Reset database if needed
bundle exec rails db:drop db:create db:migrate
```

### Verification Commands

```bash
# Check all services
sudo systemctl status campfire nginx redis-server

# Test asset loading
curl -I http://localhost:3000/assets/application-*.js

# Check firewall rules
sudo iptables -L INPUT -n --line-numbers

# Monitor logs
sudo journalctl -u campfire -f
```

## Security Considerations

1. **Change default credentials** immediately after setup
2. **Enable SSL** for production use
3. **Regular updates**: Keep system and dependencies updated
4. **Backup database**: Regular backups of `storage/db/production.sqlite3`
5. **Monitor logs**: Set up log monitoring for security events

## Optional: SSL Setup

After confirming HTTP works:

1. Install Certbot: `sudo apt install certbot python3-certbot-nginx`
2. Generate certificate: `sudo certbot --nginx -d your-domain.com`
3. Update startup script: Remove `DISABLE_SSL=true`
4. Enable Cloudflare proxy: Change to orange cloud
5. Set Cloudflare SSL to "Full (strict)"

## Performance Optimization

For production use:
- Increase VM resources (2GB+ RAM recommended)
- Set up database backups
- Configure log rotation
- Enable Gzip compression in Nginx
- Set up monitoring and alerting

## Key Files and Locations

- **Application**: `/opt/once-campfire/`
- **Database**: `/opt/once-campfire/storage/db/production.sqlite3`
- **Assets**: `/opt/once-campfire/public/assets/`
- **Service**: `/etc/systemd/system/campfire.service`
- **Nginx**: `/etc/nginx/sites-available/campfire`
- **Environment**: `/opt/once-campfire/.env`

This guide provides a complete, tested installation process that addresses the common pitfalls encountered during Campfire deployment on Oracle Cloud Infrastructure.