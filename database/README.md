# Zagon podatkovne baze

```bash
docker run -d --name uredniski_portal_db --env-file .env -p 7777:5432 -v uredniski_portal_data:/var/lib/postgresql uredniski_portal
```