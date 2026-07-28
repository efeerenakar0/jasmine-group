document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('admin-login-form');
  const status = document.getElementById('login-status');
  const button = form.querySelector('button[type="submit"]');

  try {
    const session = await fetch('/api/admin/session', { credentials: 'same-origin' });
    const result = session.headers.get('content-type')?.includes('application/json')
      ? await session.json()
      : {};
    if (session.ok && result.authenticated === true) window.location.replace('admin.html');
  } catch {
    // Login form remains available when the session check cannot connect.
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.disabled = true;
    button.textContent = 'DOĞRULANIYOR...';
    status.className = 'admin-status';
    status.textContent = '';

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : {};
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Giriş yapılamadı.');
      window.location.replace('admin.html');
    } catch (error) {
      status.className = 'admin-status is-error';
      status.textContent = error.message;
    } finally {
      button.disabled = false;
      button.textContent = 'GÜVENLİ GİRİŞ';
    }
  });
});
