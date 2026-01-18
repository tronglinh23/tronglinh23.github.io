---
title: CTF ideas (strange techniques)
description: A rolling Notion list of unusual CTF exploitation ideas and edge-case techniques.
date: 2026-01-17
tags:
  - research
  - web
  - ctf
  - techniques
category: research
source_url: https://xon1l.notion.site/CTF-ideas-2e62d1291bcc80deb002cc048436a333?source=copy_link
draft: false
---

A grab-bag of oddball CTF ideas and edge-case techniques, mostly web-focused. Highlights worth revisiting:

- DNS rebinding + cookie sandwich for bot workflows and flag-in-cookie setups.
- Encoding trick (ISO-2022-JP) to break out of quotes when input is restricted.
- CSP bypass patterns that leverage allowed `img-src` plus controlled navigation.
- Cache priming + null-initiator navigation to replay cached XSS responses.
- XS-leak via ETag size oracle and Chromium history length to detect 431 vs 200.
- Infrastructure quirks like nginx parameter limits and curl URL globbing.
