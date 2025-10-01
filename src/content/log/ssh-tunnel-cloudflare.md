---
title: "Code with Claude AI from Your Phone: VM Setup Guide"
description: "Turn your phone into a powerful coding workstation with Claude Code running in your homelab VM"
tldr: "Complete guide to setting up Claude Code in your homelab VM and accessing it securely from your phone via Cloudflare Tunnel - no open ports required."
date: 2025-07-16
tags: [HUMAN, CHEATSHEET, AI, Claude, Mobile, VM, Cloudflare]
draft: false
author: "Nikola Balić"
topics: [Homelab setup, Cloudflare Tunnel, SSH access, remote development, mobile coding, Claude Code deployment]
entities: [Oracle Cloud, Cloudflare Zero Trust, Proxmox, Ubuntu, Termux, Debian proot, Node.js, nvm]
answers_questions:
  - How do you securely access a homelab VM from mobile devices?
  - What's the complete setup for Claude Code in a remote VM?
  - How can you code with AI from your phone using Cloudflare tunnels?
---

Imagine having a powerful AI coding assistant running in your pocket, ehm homelab, that you can access from anywhere. This guide shows you how to set up Claude Code in an Ubuntu VM and access it securely through Cloudflare Tunnel, turning your mobile device into a surprisingly capable coding workstation.

**Why this setup rocks:**
- ✨ **Code with AI anywhere**: Access Claude Code from your phone, tablet, or any device
- 🔒 **Zero open ports**: Completely secure with Cloudflare Zero Trust authentication
- 🏠 **Homelab powered**: Leverage your existing VM infrastructure
- 📱 **Mobile-first**: Perfect for coding on-the-go or from the couch
- 🚀 **Always available**: Your AI assistant runs 24/7 in your homelab

The secret sauce? We'll create a secure tunnel to your VM using Cloudflare, then install Claude Code inside it. No VPN, no port forwarding, no security headaches.

**Prerequisites**

- Running Proxmox homelab with Ubuntu VM.
- Domain onboarded to Cloudflare (full or partial setup).
- Cloudflare Zero Trust account (free tier works for small personal use).
- Ability to install and run `cloudflared` on the Ubuntu VM (or another always‑on host that can reach the VM over your LAN).
- (Recommended) Identity provider configured in Cloudflare Access (or use One‑Time PIN if you prefer).

---
## **Part 1: Create and Configure the Cloudflare Tunnel**

This section covers creating the tunnel and routing traffic to your VM. These steps are performed in your Cloudflare dashboard and on a dedicated machine/LXC that will run the tunnel connector.

1.  **Create a New Tunnel:**
    *   Log in to the Cloudflare Zero Trust dashboard.
    *   Navigate to **Networks** -> **Tunnels**.
    *   Click **Create a tunnel**.
    *   Choose **Cloudflared** as the connector type and click **Next**.
    *   Give your tunnel a name (e.g., `homelab-services`) and click **Save tunnel**.

2.  **Install the Tunnel Connector:**
    *   You will now see commands to install and run the connector. Choose the tab for your OS (e.g., Debian).
    *   On your dedicated connector machine (e.g., a Proxmox LXC), copy and run the provided command. It will look like this:
        ```bash
        sudo cloudflared service install <YOUR_TUNNEL_TOKEN>
        ```
    *   This command downloads, installs, and starts `cloudflared` as a system service.
    *   Once you see active connectors on the dashboard page, click **Next**.

3.  **Route Traffic to your Ubuntu VM:**
    *   Now, you will configure a "Public Hostname" to direct traffic.
    *   Fill out the form:
        *   **Subdomain:** `ubuntu`
        *   **Domain:** `your-domain.com`
        *   **Type:** `SSH`
        *   **URL:** `192.168.x.x:22` (Use the actual internal IP of your Ubuntu VM)
    *   Click **Save tunnel**.

4.  **Secure the Hostname with Cloudflare Access:**
    *   In the Zero Trust dashboard, navigate to **Access** -> **Applications**.
    *   Click **Add an application** and choose **Self-hosted**.
    *   Fill out the application details:
        *   **Application name:** `Ubuntu VM SSH` (or any name you prefer)
        *   **Subdomain:** `ubuntu`
        *   **Domain:** `your-domain.com`
    *   On the next screen, add a policy to define who can connect:
        *   **Policy name:** `Allow Admins`
        *   **Action:** `Allow`
        *   Under **Configure rules**, create an `Include` rule (e.g., Selector: `Emails`, Value: `your-email@example.com`).
    *   Click **Save policy**, then **Add application**.

---

## **Part 2: Connecting from a Desktop (macOS / Linux)**

1.  **Install the Cloudflare Helper:**
    *   **macOS:** `brew install cloudflared`
    *   **Debian/Ubuntu:** Follow the [official guide](https://pkg.cloudflare.com/) to add the repository, then `sudo apt install cloudflared`.

2.  **Log in to Cloudflare Access (One-Time):**
    *   In your terminal, run:
        ```bash
        cloudflared access login https://ubuntu.your-domain.com
        ```
    *   A browser window will open. Complete the login/OTP process.

3.  **Configure Your SSH Client:**
    *   Edit your local SSH config file (`~/.ssh/config`):
        ```
        Host ubuntu.your-domain.com
          User <your-vm-username>
          ProxyCommand cloudflared access ssh --hostname %h
        ```
    *   Replace `<your-vm-username>` with the actual user on the Ubuntu VM (e.g., `root`, `nikola`).

4.  **Connect:**
    *   You can now connect with a simple command:
        ```bash
        ssh ubuntu.your-domain.com
        ```

I did have some small hick up as I am using Ghostty so I had to run this line to ensure compatibility:
```bash
 infocmp -x xterm-ghostty | ssh ubuntu.limitkiller.com -- tic -x -
```

---

## **Part 3: Connecting from an Android Phone**

The best method is using **Termux** with a **Debian proot** environment. My primary device is Iphone but sadly after some battle with iSH and cloudflared I gave up and charged my backup Samsung.

**EDIT:** I just found out there is an app in beta for iPhone - a mobile app for Claude Code: https://codeagentsmobile.maketry.xyz/

1.  **Install Termux** from F-Droid or Google Play.
2.  **Install Debian Environment:** In Termux, run:
    ```sh
    pkg update && pkg install proot-distro
    proot-distro install debian
    ```
3.  **Log in to Debian:**
    ```sh
    proot-distro login debian
    ```
4.  **Install Tools (inside Debian):** You are now in a Debian shell. Run:
    ```sh
    apt update
    apt install -y curl openssh-client ca-certificates
    ```
5.  **Install Cloudflared (inside Debian):**
    ```sh
    curl -Lo /usr/local/bin/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64
    chmod +x /usr/local/bin/cloudflared
    ```
6.  **Authenticate (inside Debian):**
    ```sh
    cloudflared access login https://ubuntu.your-domain.com
    ```
7.  **Configure SSH Client (inside Debian):** Create the config file `~/.ssh/config`:
    ```
    Host ubuntu.your-domain.com
      User <your-vm-username>
      ProxyCommand /usr/local/bin/cloudflared access tcp --hostname %h --destination 192.168.x.x:22
    ```
    *   *Note: Replace `192.168.x.x` with your VM's actual internal IP.*

8.  **Connect:**
    ```sh
    ssh ubuntu.your-domain.com
    ```

---

## **Part 4: Post-Connection Setup (Installing Claude Code)**

After you have successfully connected to your Ubuntu VM via SSH, follow these steps *inside the VM* to install `claude-code`.

1.  **Install Node.js Version Manager (nvm):**
    *   First, install `curl` if it's not already present:
        ```bash
        sudo apt update && sudo apt install -y curl
        ```
    *   Download and run the nvm installation script:
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
        ```
    *   Activate `nvm` by sourcing your shell's configuration file. (You may need to close and reopen your SSH session for this to take full effect).
        ```bash
        source ~/.bashrc
        ```

2.  **Install Node.js (v18 or newer):**
    *   Use `nvm` to install Node.js LTS version 18:
        ```bash
        nvm install 18
        ```
    *   Set this version as the one to use in your current session:
        ```bash
        nvm use 18
        ```
    *   Verify the installation:
        ```bash
        node -v  # Should show v18.x.x
        npm -v   # Should show a corresponding npm version
        ```

3.  **Install Claude Code:**
    *   Use `npm` to install the `claude-code` package globally:
        ```bash
        npm install -g @anthropic-ai/claude-code
        ```

4.  **Start Using Claude Code:**
    *   Navigate to your project's directory:
        ```bash
        cd /path/to/your-awesome-project
        ```
    *   Launch the tool:
        ```bash
        claude
        ```

You are now ready to code with Claude directly in your VM's terminal connecting from your phone or whatever.