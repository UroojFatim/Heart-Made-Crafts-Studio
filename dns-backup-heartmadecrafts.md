# DNS backup — heartmadecrafts.studio

Taken from name.com before moving DNS to Cloudflare.
Date: 4 September 2026

If anything goes wrong during the move, these are the exact records to
restore. Nothing here is secret — DNS records are public — but losing the
TXT record breaks Google Search Console verification.

## Registrar

- **name.com**, account `UroojFatim` (Account Code 3232836-51d7e8a)
- Renews 15 May 2027, auto-renew ON
- WHOIS privacy ON, Transfer lock ON

## Nameservers (current)

```
ns1.name.com
ns2.name.com
ns3.name.com
ns4.name.com
```

DNS is hosted at name.com, not at Vercel. That means the three records
below live at name.com and must be re-created on Cloudflare.

## DNS records — all three

| Type | Host | Answer | TTL |
|---|---|---|---|
| A | `heartmadecrafts.studio` | `216.198.79.1` | 300 |
| CNAME | `www.heartmadecrafts.studio` | `95261921c7d86cb7.vercel-dns-017.com` | 300 |
| TXT | `heartmadecrafts.studio` | `google-site-verification=672ZFxQRQ6UFAE016p_uDZJS5gj4Xlt2-ovgS7dez7c` | 3600 |

### What each one does

- **A record** → Vercel's anycast IP. This is what serves the site at the
  bare domain.
- **CNAME on www** → Vercel's per-project DNS target. This serves
  `www.heartmadecrafts.studio`, which is the canonical URL in `lib/site.ts`.
- **TXT** → Google Search Console verification. **Do not lose this one.**
  If it disappears, Search Console stops verifying the property and you
  lose access to your own search data.

### What is NOT there

- **No MX records.** No email runs on this domain, so there is no mailbox
  to break. (`heartmadecraft.studio@gmail.com` is a Gmail address and is
  unaffected by any of this.)
- No AAAA, no CAA, no SRV.

Three records, no email. This is about as safe a DNS move as it gets.

## After the move to Cloudflare

Both the A record and the www CNAME must be set to **DNS only — grey
cloud**, not proxied/orange. Vercel issues its own certificate, and
proxying through Cloudflare on top of that causes redirect loops and TLS
errors.

The TXT record stays as it is; proxying does not apply to TXT.
