<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nouveau lead — Isla Joya</title>
<style>
  body { font-family: sans-serif; background: #f9f6f0; margin: 0; padding: 24px; color: #17120d; }
  .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 560px; margin: 0 auto; }
  .logo { font-size: 20px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px; color: #17120d; }
  h1 { font-size: 22px; margin: 0 0 8px; }
  .subtitle { color: #776955; font-size: 14px; margin-bottom: 28px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 10px 0; border-bottom: 1px solid #f0ece5; font-size: 14px; vertical-align: top; }
  td:first-child { color: #776955; width: 38%; }
  td:last-child { font-weight: 500; }
  .badge { display: inline-block; background: #f4e8cd; color: #c6a15b; border-radius: 999px; padding: 3px 10px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
  .btn { display: inline-block; margin-top: 24px; background: #17120d; color: #fff; text-decoration: none; border-radius: 999px; padding: 12px 28px; font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; }
  .footer { margin-top: 32px; font-size: 12px; color: #b0a090; text-align: center; }
</style>
</head>
<body>
<div class="card">
  <div class="logo">✦ Isla Joya</div>
  <h1>Nouveau lead wholesale</h1>
  <p class="subtitle">Reçu le {{ now()->format('d/m/Y à H:i') }} · <span class="badge">{{ $lead->status }}</span></p>

  <table>
    <tr><td>Nom</td><td>{{ $lead->name }}</td></tr>
    @if($lead->business)
    <tr><td>Entreprise</td><td>{{ $lead->business }}</td></tr>
    @endif
    @if($lead->email)
    <tr><td>Email</td><td><a href="mailto:{{ $lead->email }}">{{ $lead->email }}</a></td></tr>
    @endif
    <tr><td>Téléphone</td><td>{{ $lead->phone }}</td></tr>
    @if($lead->whatsapp)
    <tr><td>WhatsApp</td><td><a href="https://wa.me/{{ preg_replace('/\D/', '', $lead->whatsapp) }}">{{ $lead->whatsapp }}</a></td></tr>
    @endif
    @if($lead->country)
    <tr><td>Pays</td><td>{{ $lead->country }}</td></tr>
    @endif
    @if($lead->monthly_orders)
    <tr><td>Cdes / mois</td><td>{{ $lead->monthly_orders }}</td></tr>
    @endif
    <tr><td>Source</td><td>{{ $lead->source }}</td></tr>
  </table>

  <a href="{{ config('app.url') }}/admin/leads/{{ $lead->id }}/edit" class="btn">
    Ouvrir dans Filament
  </a>
</div>
<div class="footer">Isla Joya · Notification automatique · Ne pas répondre</div>
</body>
</html>
