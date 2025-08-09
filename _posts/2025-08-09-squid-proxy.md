---
layout: page
title: "How to Set Up a Secure HTTPS Proxy Using Squid + stunnel on Amazon EC2 with a Custom Domain"
date: 2025-08-09
categories: [tech, proxy, ec2]
tags: [ec2,squid,proxy,stunnel]
excerpt: "If you're looking to bypass public network restrictions (e.g., university Wi-Fi like Amity), while maintaining security and privacy, here's a proven and tested guide based on a working configuration. This setup uses:"
---

# How to Set Up a Secure HTTPS Proxy Using Squid + stunnel on Amazon EC2 with a Custom Domain

If you're looking to bypass public network restrictions (e.g., university Wi-Fi like Amity), while maintaining security and privacy, here's a proven and tested guide based on a working configuration. This setup uses:

* **Amazon EC2**
* **Squid Proxy** for HTTP/S traffic filtering
* **stunnel** to encrypt traffic and mimic HTTPS
* **Let's Encrypt SSL** for HTTPS support
* **Custom Domain via Cloudflare**

---

## ✅ Final Working Architecture

```text
[Client (PC/Phone)]
   |
   |  (HTTPS traffic over port 443)
   v
[stunnel (TLS)]
   |
   |  (local unencrypted to Squid)
   v
[Squid Proxy]
   |
   v
[Internet]
```

---

## 🔧 Prerequisites

* Ubuntu/Debian-based EC2 Instance (t2.micro is fine)
* Domain name (e.g., `proxy.atrajit.jp`)
* Port 443 opened in EC2 Security Group

---

## 🧱 Step-by-Step Setup

### 1. **Install Required Packages**


```bash
sudo apt update
sudo apt install squid stunnel4 certbot -y
```


---

### 2. **Allow Port 443 in EC2**

* Go to EC2 Dashboard → Security Groups → Edit Inbound Rules
* Add:

  * Type: HTTPS
  * Port: 443
  * Source: Anywhere (or restrict to your IP)

---

### 3. **Obtain SSL Certificate**


```bash
sudo certbot certonly --standalone -d proxy.atrajit.jp
```


Certificates will be saved at:

* `/etc/letsencrypt/live/proxy.atrajit.jp/fullchain.pem`
* `/etc/letsencrypt/live/proxy.atrajit.jp/privkey.pem`

---

### 4. **Configure stunnel**

**Edit `/etc/stunnel/proxy.conf`**:


```ini
cert = /etc/letsencrypt/live/proxy.atrajit.jp/fullchain.pem
key = /etc/letsencrypt/live/proxy.atrajit.jp/privkey.pem

[https]
accept = 443
connect = 127.0.0.1:3128
TIMEOUTclose = 0
client = no
```


**Enable stunnel:**


```bash
echo 'ENABLED=1' | sudo tee -a /etc/default/stunnel4
sudo systemctl enable stunnel4
sudo systemctl restart stunnel4
```


---

### 5. **Configure Squid**

**Edit `/etc/squid/squid.conf`**:
Ensure these lines are set:


```conf
http_access deny all

# Allow localhost and known IPs
acl localnet src 127.0.0.1
http_access allow localnet

# Remove revealing headers
request_header_access Allow deny all
request_header_access Authorization deny all
request_header_access Cache-Control deny all
request_header_access Content-Encoding deny all
request_header_access Content-Length deny all
request_header_access Content-Type deny all
request_header_access Date deny all
request_header_access Expect deny all
request_header_access Host deny all
request_header_access If-Modified-Since deny all
request_header_access Last-Modified deny all
request_header_access Location deny all
request_header_access Pragma deny all
request_header_access Referer deny all
request_header_access Server deny all
request_header_access Transfer-Encoding deny all
request_header_access User-Agent deny all
request_header_access Via deny all
request_header_access WWW-Authenticate deny all
request_header_access X-Forwarded-For deny all
request_header_access X-Real-IP deny all
request_header_access X-Request-ID deny all
request_header_access X-Amzn-Trace-Id deny all
request_header_access All deny all

visible_hostname proxy
```


**Restart Squid:**


```bash
sudo systemctl restart squid
```


---

### 6. **Test Your Proxy**

Use any browser or system proxy tool and set your proxy:

* **Type:** HTTPS
* **Host:** `proxy.atrajit.jp`
* **Port:** 443

To verify if headers are blocked:


```bash
curl -x https://proxy.atrajit.jp:443 -k https://httpbin.org/headers
```


You should see **cleaned headers** (minimal or none).

---

### 7. **Note on Detection**

Even though the proxy is secure and leaks no headers, your EC2 IP may still be flagged as a proxy due to being in a **known data center range** ("DCH - Dedicated Hosting"). To avoid detection:

* Use **residential IP providers**
* Or **tunnel traffic from a home server**

---

## 🎉 Conclusion

You've now set up a secure, header-stripped, HTTPS-based proxy server that works on restricted networks. Use it responsibly.

If you wish to hide it further or rotate IPs, explore residential proxies or cloudflare tunnels.

---

**Author:** Atrajit Sarkar
**Domain Used:** [https://proxy.atrajit.jp/](https://proxy.atrajit.jp)
**Server:** Amazon EC2
**Tested & Working:** July 2025
