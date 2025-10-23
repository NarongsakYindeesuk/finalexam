# WAF demo with OWASP ModSecurity CRS

This repository contains a small demo setup (docker-compose style) for:
- an NGINX WAF using OWASP ModSecurity CRS (image: owasp/modsecurity-crs:nginx)
- a simple web proxy (web-server/)
- demo rules (waf-nginx-crs/crs/optional_rules.conf) to trigger a SQLi block

How to run (on the VM where Docker is installed):
1. Build/run mock backend, web and waf (example steps are in this repo)
2. Test:
   - curl -i "http://localhost:8080/"           # should return 200 OK
   - curl -i "http://localhost:8080/?id=1' OR '1'='1"   # should return 403 Forbidden (WAF)
3. See `waf-test-report.pdf` for captured evidence.

Files:
- docker-compose.yaml (or run instructions)
- waf-nginx-crs/ (WAF template + rules)
- web-server/ (reverse-proxy)
- waf-test-report.pdf (test evidence)
