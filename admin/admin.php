<?php
session_start();

// Login handling
if (isset($_POST['login'])) {
    if ($_POST['user'] === 'jasmine' && $_POST['pass'] === 'jasmine') {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $error = "Hatalı Giriş!";
    }
}

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit;
}

// Check session
$is_logged_in = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Read data for stats
$props = [];
if ($is_logged_in) {
    if(file_exists('data.json')) {
        $data = json_decode(file_get_contents('data.json'), true);
        $props = isset($data['properties']) ? $data['properties'] : [];
    }
}
$totalProps = count($props);
$totalSale = count(array_filter($props, function($p) { return $p['type'] == 'sale'; }));
$totalRent = count(array_filter($props, function($p) { return $p['type'] == 'rent'; }));

if (!$is_logged_in):
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Jasmine Group - Admin Giriş</title>
    <style>
        body { font-family: 'Inter', sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .login-box { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }
        .login-box img { max-width: 150px; margin-bottom: 20px; }
        .login-box h2 { margin: 0 0 20px; color: #1e293b; }
        .login-box input { width: 100%; padding: 12px 15px; margin-bottom: 15px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; font-size: 15px; }
        .login-box button { width: 100%; padding: 12px; background: #e11d48; color: #fff; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .login-box button:hover { background: #be123c; }
        .error { color: #e11d48; margin-bottom: 15px; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>Yönetim Paneli</h2>
        <?php if(isset($error)) echo "<div class='error'>$error</div>"; ?>
        <form method="POST">
            <input type="text" name="user" placeholder="Kullanıcı Adı" required>
            <input type="password" name="pass" placeholder="Şifre" required>
            <button type="submit" name="login">Giriş Yap</button>
        </form>
    </div>
</body>
</html>
<?php else: ?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Jasmine Group - Yönetim Paneli</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        :root { --sidebar: #0f172a; --bg: #f8fafc; --card: #ffffff; --primary: #e11d48; --text: #334155; }
        body { font-family: 'Inter', sans-serif; margin: 0; background: var(--bg); color: var(--text); display: flex; height: 100vh; overflow: hidden; }
        
        /* Sidebar */
        .sidebar { width: 260px; background: var(--sidebar); color: #fff; display: flex; flex-direction: column; }
        .sidebar-header { padding: 20px; font-size: 20px; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; letter-spacing: 2px; }
        .nav-menu { list-style: none; padding: 20px 0; margin: 0; flex: 1; }
        .nav-menu li a { display: block; padding: 15px 25px; color: #cbd5e1; text-decoration: none; transition: 0.2s; display: flex; align-items: center; gap: 10px; }
        .nav-menu li a:hover, .nav-menu li.active a { background: rgba(255,255,255,0.1); color: #fff; border-left: 4px solid var(--primary); }
        .logout-btn { padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
        .logout-btn a { color: #f87171; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; }
        
        /* Main Content */
        .main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
        .topbar { background: var(--card); padding: 20px 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; }
        .topbar h2 { margin: 0; font-size: 20px; font-weight: 600; }
        .user-info { display: flex; align-items: center; gap: 10px; font-weight: 500; }
        .user-info img { width: 35px; height: 35px; border-radius: 50%; }
        
        .content-area { padding: 30px; }
        
        /* Stats Cards */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: var(--card); padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 20px; }
        .stat-icon { width: 60px; height: 60px; border-radius: 12px; background: #ffe4e6; color: var(--primary); display: flex; justify-content: center; align-items: center; font-size: 24px; }
        .stat-info h3 { margin: 0; font-size: 28px; font-weight: 700; color: #1e293b; }
        .stat-info p { margin: 5px 0 0; font-size: 14px; color: #64748b; font-weight: 500; text-transform: uppercase; }
        
        /* Panels */
        .panel { background: var(--card); border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px; overflow: hidden; }
        .panel-header { padding: 20px 25px; border-bottom: 1px solid #f1f5f9; background: #fff; font-weight: 600; font-size: 16px; display: flex; justify-content: space-between; align-items: center; }
        .panel-body { padding: 25px; }
        
        /* Complex Form */
        .form-section { margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px dashed #e2e8f0; }
        .form-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .form-section-title { font-size: 14px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 15px; letter-spacing: 1px; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label { font-size: 14px; font-weight: 500; color: #475569; }
        .form-group input, .form-group select, .form-group textarea { padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--primary); }
        .form-group textarea { resize: vertical; min-height: 100px; }
        
        .btn-submit { background: var(--primary); color: #fff; border: none; padding: 15px 30px; font-size: 16px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: 0.2s; display: inline-flex; align-items: center; gap: 10px; }
        .btn-submit:hover { background: #be123c; }
        
        /* Tables */
        table { width: 100%; border-collapse: collapse; }
        table th { background: #f8fafc; padding: 15px; text-align: left; font-size: 13px; text-transform: uppercase; color: #64748b; border-bottom: 1px solid #e2e8f0; }
        table td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; vertical-align: middle; }
        table tr:hover td { background: #f8fafc; }
        .badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge.sale { background: #dbeafe; color: #1e40af; }
        .badge.rent { background: #fef3c7; color: #b45309; }
        .action-btn { background: #fee2e2; color: #ef4444; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: 0.2s; }
        .action-btn:hover { background: #fca5a5; color: #fff; }
    </style>
</head>
<body>
    
    <aside class="sidebar">
        <div class="sidebar-header">JASMINE ADMIN</div>
        <ul class="nav-menu">
            <li class="active"><a href="#dashboard" onclick="showTab('dashboard')"><i class="fa-solid fa-chart-pie"></i> Gösterge Paneli</a></li>
            <li><a href="#add" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> Yeni İlan Ekle</a></li>
            <li><a href="#list" onclick="showTab('list')"><i class="fa-solid fa-list"></i> Tüm İlanlar</a></li>
        </ul>
        <div class="logout-btn">
            <a href="?logout=1"><i class="fa-solid fa-right-from-bracket"></i> Çıkış Yap</a>
        </div>
    </aside>
    
    <main class="main-content">
        <div class="topbar">
            <h2 id="page-title">Gösterge Paneli</h2>
            <div class="user-info">
                <span>Yönetici</span>
                <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin">
            </div>
        </div>
        
        <div class="content-area">
            
            <!-- DASHBOARD TAB -->
            <div id="tab-dashboard" class="tab-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fa-solid fa-building"></i></div>
                        <div class="stat-info">
                            <h3><?= $totalProps ?></h3>
                            <p>Toplam İlan</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#dbeafe; color:#2563eb;"><i class="fa-solid fa-handshake"></i></div>
                        <div class="stat-info">
                            <h3><?= $totalSale ?></h3>
                            <p>Satılık İlanlar</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#fef3c7; color:#d97706;"><i class="fa-solid fa-key"></i></div>
                        <div class="stat-info">
                            <h3><?= $totalRent ?></h3>
                            <p>Kiralık İlanlar</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ADD PROPERTY TAB -->
            <div id="tab-add" class="tab-content" style="display:none;">
                <div class="panel">
                    <div class="panel-header">Kapsamlı Yeni İlan Formu</div>
                    <div class="panel-body">
                        <form id="add-form" onsubmit="event.preventDefault(); addProp();">
                            
                            <div class="form-section">
                                <div class="form-section-title">Temel Bilgiler</div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>İlan Türü</label>
                                        <select id="type" required>
                                            <option value="sale">Satılık</option>
                                            <option value="rent">Kiralık</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>İlan Başlığı</label>
                                        <input type="text" id="title" placeholder="Örn: Alanya Oba'da Lüks Daire" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Lokasyon</label>
                                        <input type="text" id="location" placeholder="Örn: Oba, Alanya" required>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-section">
                                <div class="form-section-title">Teknik Detaylar & Fiyat</div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Oda Sayısı</label>
                                        <input type="text" id="rooms" placeholder="Örn: 2+1" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Banyo Sayısı</label>
                                        <input type="text" id="bathrooms" placeholder="Örn: 2 Banyo" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Brüt Alan (m²)</label>
                                        <input type="text" id="area_net" placeholder="Örn: 120 m²" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Fiyat (Euro €)</label>
                                        <input type="number" id="price_eur" placeholder="Sadece rakam yazın (Örn: 150000)" required>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-section">
                                <div class="form-section-title">Medya Yükleme</div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Bilgisayardan Fotoğraflar Seç (Çoklu)</label>
                                        <input type="file" id="images" accept="image/*" multiple>
                                        <span style="font-size:12px; color:#94a3b8; margin-top:-3px;">50MB'a kadar çoklu resim yükleyebilirsiniz.</span>
                                    </div>
                                    <div class="form-group">
                                        <label>VEYA Dış Bağlantı URL (Opsiyonel)</label>
                                        <input type="text" id="image_url" placeholder="https://...">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-section">
                                <div class="form-section-title">Detaylı Açıklama</div>
                                <div class="form-group full">
                                    <label>Açıklama Metni</label>
                                    <textarea id="desc" placeholder="İlan hakkında detaylı açıklama..." required></textarea>
                                </div>
                            </div>
                            
                            <div style="text-align: right; margin-top: 20px;">
                                <button type="submit" class="btn-submit" id="submitBtn">
                                    <i class="fa-solid fa-save"></i> İlanı Kaydet ve Yayınla
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- LIST PROPERTIES TAB -->
            <div id="tab-list" class="tab-content" style="display:none;">
                <div class="panel">
                    <div class="panel-header">
                        <span>Tüm İlanlar (<?= $totalProps ?>)</span>
                    </div>
                    <div class="panel-body" style="padding:0;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kodu</th>
                                    <th>Türü</th>
                                    <th>Başlık</th>
                                    <th>Fiyat (€)</th>
                                    <th style="text-align:right;">İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($props as $p): ?>
                                <tr>
                                    <td><strong><?= $p['id'] ?></strong></td>
                                    <td><span class="badge <?= $p['type'] ?>"><?= $p['type'] == 'sale' ? 'Satılık' : 'Kiralık' ?></span></td>
                                    <td><?= $p['title'] ?></td>
                                    <td><strong>€ <?= number_format($p['price_eur'], 0, ',', '.') ?></strong></td>
                                    <td style="text-align:right;">
                                        <button class="action-btn" onclick="deleteProp('<?= $p['id'] ?>')"><i class="fa-solid fa-trash"></i> Sil</button>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </main>

    <script>
        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
            document.getElementById('tab-' + tabId).style.display = 'block';
            
            document.querySelectorAll('.nav-menu li').forEach(el => el.classList.remove('active'));
            event.currentTarget.parentElement.classList.add('active');
            
            const titles = { 'dashboard': 'Gösterge Paneli', 'add': 'Yeni İlan Ekle', 'list': 'Tüm İlanlar' };
            document.getElementById('page-title').innerText = titles[tabId];
        }

        async function addProp() {
            let btn = document.getElementById('submitBtn');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor...';
            btn.disabled = true;
            
            let fd = new FormData();
            
            let files = document.getElementById('images').files;
            for(let i=0; i<files.length; i++) {
                fd.append('images[]', files[i]);
            }
            
            ['type', 'title', 'location', 'rooms', 'bathrooms', 'area_net', 'price_eur', 'image_url', 'desc'].forEach(k => {
                fd.append(k, document.getElementById(k).value);
            });
            
            try {
                let r = await fetch('api.php?action=add_property', { method: 'POST', body: fd });
                let res = await r.json();
                if(res.status === 'success') {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'İlan anında sisteme kaydedildi ve ana sayfada yayına alındı.',
                        icon: 'success',
                        confirmButtonColor: '#e11d48'
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire('Hata!', 'İlan eklenemedi.', 'error');
                }
            } catch(e) {
                console.error(e);
                Swal.fire('Bağlantı Hatası', 'Lütfen PHP sunucusunun çalıştığından emin olun. Live Server kullanıyorsanız resim yüklenemez.', 'error');
            }
            
            btn.innerHTML = '<i class="fa-solid fa-save"></i> İlanı Kaydet ve Yayınla';
            btn.disabled = false;
        }

        async function deleteProp(id) {
            Swal.fire({
                title: 'Emin misiniz?',
                text: "Bu ilanı kalıcı olarak silmek üzeresiniz!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e11d48',
                cancelButtonColor: '#94a3b8',
                confirmButtonText: 'Evet, Sil!',
                cancelButtonText: 'İptal'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let fd = new FormData();
                    fd.append('id', id);
                    try {
                        let r = await fetch('api.php?action=delete_property', { method: 'POST', body: fd });
                        let res = await r.json();
                        if(res.status === 'success') {
                            location.reload();
                        }
                    } catch(e) {
                        Swal.fire('Hata!', 'Silme işlemi başarısız.', 'error');
                    }
                }
            })
        }
    </script>
</body>
</html>
<?php endif; ?>
