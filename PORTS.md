# Port Registry

Single source of truth for which local ports are in use, by what, and who manages them.
Update this **and** `ecosystem.config.js` together whenever you add or remove a hosted app.

## Application ports (PM2-managed)

| Port | Service            | Manager | Project                   | Notes                          |
|------|--------------------|---------|---------------------------|--------------------------------|
| 9999 | ai-eng-dashboard   | PM2     | ai-eng-learning-dashboard | Dashboard + live `/api/pm2` status endpoint |

## Reserved / system ports (do not reuse)

| Port | Service          | Notes                          |
|------|------------------|--------------------------------|
| 53   | systemd-resolved | Local DNS stub resolver        |
| 631  | CUPS             | Local printing daemon          |

## Conventions

- **Range for our apps:** 9000–9999. Pick the next free one for a new service.
- **One port per app.** Two apps must never share a port.
- Adding an app:
  1. Add an entry to `ecosystem.config.js` with a unique port.
  2. Add a row to the table above.
  3. `pm2 start ecosystem.config.js && pm2 save`
- Check before claiming a port: `ss -ltn | grep :<port>` (empty = free).

## Useful commands

```bash
pm2 list                 # all managed apps + status
pm2 logs ai-eng-dashboard
pm2 restart ai-eng-dashboard
pm2 stop ai-eng-dashboard
pm2 save                 # persist current process list
ss -ltnp                 # every listening port on the box
```
