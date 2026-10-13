export interface NewsletterIssue {
  number: number;
  date: string; // send date, YYYY-MM-DD
  subject: string;
  leadTitle: string;
  leadUrl: string;
  status: 'sent' | 'scheduled';
}

// Archive of Close Supervision issues.
// Full name in prose; the short URL /supervision is the sanctioned
// shorthand — see newsletter/BRAND.md.
export const newsletterIssues: NewsletterIssue[] = [
  {
    number: 1,
    date: '2026-10-27',
    subject: 'From 11 minutes to 4: tuning a browsing agent',
    leadTitle: '4 Minutes to Book: Cutting a Browsing Agent Loop',
    leadUrl: '/4-minutes-to-book',
    status: 'scheduled',
  },
];
