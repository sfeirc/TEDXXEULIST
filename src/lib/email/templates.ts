// Shared HTML shell for all emails
function shell(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>TEDx IMT Paris</title>
</head>
<body style="margin:0;padding:0;background:#070706;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#070706;padding:48px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:18px;font-weight:700;color:#e62b1e;letter-spacing:-0.5px;">TED<span style="color:#e62b1e;">x</span></td>
              <td style="padding-left:10px;font-size:11px;font-weight:600;color:rgba(200,190,175,0.5);letter-spacing:0.2em;text-transform:uppercase;">× IMT Paris</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Card -->
      <tr>
        <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(200,190,175,0.1);border-radius:16px;padding:40px 40px 36px;">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding-top:28px;font-size:11px;color:rgba(200,190,175,0.25);text-align:center;line-height:1.7;">
          TEDx IMT Paris · Théâtre de Paris<br/>
          Cet email a été envoyé suite à une action sur <a href="https://tedximtparis.com" style="color:rgba(200,190,175,0.4);">tedximtparis.com</a>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function h1(text: string) {
  return `<h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#f4f0e8;line-height:1.2;">${text}</h1>`;
}

function eyebrow(text: string) {
  return `<p style="margin:0 0 20px;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(200,190,175,0.4);">${text}</p>`;
}

function body(text: string) {
  return `<p style="margin:20px 0 0;font-size:15px;color:rgba(200,190,175,0.7);line-height:1.7;">${text}</p>`;
}

function divider() {
  return `<hr style="border:none;border-top:1px solid rgba(200,190,175,0.1);margin:28px 0;"/>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(200,190,175,0.35);width:110px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:14px;color:#f4f0e8;">${value}</td>
  </tr>`;
}

function cta(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block;margin-top:28px;padding:12px 28px;background:#e62b1e;color:#fff;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;border-radius:8px;">${label}</a>`;
}

function badge(text: string, color: string) {
  return `<span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;background:${color}22;color:${color};border:1px solid ${color}44;">${text}</span>`;
}

// ── Templates ────────────────────────────────────────────────────────────────

export function registrationPendingEmail(name: string): string {
  return shell(`
    ${eyebrow('Inscription reçue')}
    ${h1(`Merci, ${name} !`)}
    ${body('Nous avons bien reçu votre demande d\'inscription à <strong style="color:#f4f0e8;">TEDx IMT Paris 2027</strong>. Votre dossier est en cours d\'examen par notre équipe.')}
    ${body('Vous recevrez un email de confirmation dès que votre place sera validée. La capacité est limitée — nous vous remercions de votre patience.')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${infoRow('Évènement', 'TEDx IMT Paris 2027')}
      ${infoRow('Date', '22 février 2027')}
      ${infoRow('Statut', badge('En attente de validation', '#f59e0b'))}
    </table>
    ${cta('Voir le site', 'https://tedximtparis.com')}
  `);
}

export function registrationConfirmedEmail(name: string): string {
  return shell(`
    ${eyebrow('Place confirmée')}
    ${h1(`Votre place est confirmée !`)}
    ${body(`Félicitations, <strong style="color:#f4f0e8;">${name}</strong> ! Votre inscription à <strong style="color:#f4f0e8;">TEDx IMT Paris 2027</strong> est officiellement confirmée.`)}
    ${body('Conservez cet email — nous vous enverrons les informations pratiques (lieu exact, programme, accès) dans les semaines précédant l\'événement.')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${infoRow('Évènement', 'TEDx IMT Paris 2027')}
      ${infoRow('Date', '22 février 2027')}
      ${infoRow('Lieu', 'Théâtre de Paris')}
      ${infoRow('Statut', badge('Confirmé', '#22c55e'))}
    </table>
    ${cta('Voir le programme', 'https://tedximtparis.com/programme')}
    ${body('<span style="font-size:13px;">Des questions ? Répondez à cet email ou contactez-nous via <a href="https://tedximtparis.com/contact" style="color:#e62b1e;">tedximtparis.com/contact</a></span>')}
  `);
}

export function registrationWaitlistedEmail(name: string): string {
  return shell(`
    ${eyebrow('Liste d\'attente')}
    ${h1(`Vous êtes sur la liste d'attente`)}
    ${body(`<strong style="color:#f4f0e8;">${name}</strong>, merci de votre intérêt pour TEDx IMT Paris 2027. L'évènement affiche complet, mais vous êtes inscrit(e) sur notre liste d'attente.`)}
    ${body('Si une place se libère, vous serez automatiquement notifié(e) par email. Nous vous recontacterons dans les meilleurs délais.')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${infoRow('Évènement', 'TEDx IMT Paris 2027')}
      ${infoRow('Statut', badge('Liste d\'attente', '#60a5fa'))}
    </table>
    ${cta('Voir le site', 'https://tedximtparis.com')}
  `);
}

export function registrationWaitlistPromotedEmail(name: string): string {
  return shell(`
    ${eyebrow('Bonne nouvelle !')}
    ${h1('Une place s\'est libérée pour vous')}
    ${body(`<strong style="color:#f4f0e8;">${name}</strong>, une place vient de se libérer à <strong style="color:#f4f0e8;">TEDx IMT Paris 2027</strong> et nous l'avons réservée pour vous !`)}
    ${body('Votre inscription est maintenant <strong style="color:#f4f0e8;">confirmée</strong>. Conservez cet email comme preuve de votre place.')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${infoRow('Évènement', 'TEDx IMT Paris 2027')}
      ${infoRow('Date', '22 février 2027')}
      ${infoRow('Lieu', 'Théâtre de Paris')}
      ${infoRow('Statut', badge('Confirmé', '#22c55e'))}
    </table>
    ${cta('Voir le programme', 'https://tedximtparis.com/programme')}
  `);
}

export function contactAutoReplyEmail(name: string, subject: string): string {
  return shell(`
    ${eyebrow('Message reçu')}
    ${h1(`Merci, ${name}`)}
    ${body(`Nous avons bien reçu votre message concernant <strong style="color:#f4f0e8;">"${subject}"</strong>.`)}
    ${body('Notre équipe vous répondra dans les 48–72 heures. En attendant, n\'hésitez pas à consulter notre site pour les informations générales sur l\'évènement.')}
    ${divider()}
    ${cta('Visiter le site', 'https://tedximtparis.com')}
  `);
}

export function adminNewRegistrationEmail(name: string, email: string, institution?: string | null): string {
  return shell(`
    ${eyebrow('Nouvelle inscription')}
    ${h1('Nouvelle demande d\'inscription')}
    ${body('Une nouvelle inscription vient d\'être soumise sur tedximtparis.com.')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${infoRow('Nom', name)}
      ${infoRow('Email', `<a href="mailto:${email}" style="color:#e62b1e;">${email}</a>`)}
      ${infoRow('Institution', institution ?? '—')}
    </table>
    ${cta('Gérer les inscriptions', 'https://admin.tedximtparis.com/registrations')}
  `);
}

export function adminNewContactEmail(name: string, email: string, subject: string, message: string): string {
  return shell(`
    ${eyebrow('Nouveau message')}
    ${h1('Nouveau message de contact')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${infoRow('De', `${name} — <a href="mailto:${email}" style="color:#e62b1e;">${email}</a>`)}
      ${infoRow('Sujet', subject)}
    </table>
    <p style="margin:20px 0 0;font-size:14px;color:rgba(200,190,175,0.7);line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
    ${cta('Voir dans l\'admin', 'https://admin.tedximtparis.com/contacts')}
  `);
}
