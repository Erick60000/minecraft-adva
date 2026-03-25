// --- CONFIGURACIÓN DE LA APP ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("MC Advanced: Sistema Iniciado...");

    // 1. FUNCIONALIDAD DEL MENÚ MÓVIL
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animación del icono (opcional)
            menuToggle.classList.toggle('rotate');
        });
    }

    // 2. SISTEMA DE VENTANA FLOTANTE (MODAL)
    const modal = document.getElementById('modal-details');
    const closeBtn = document.querySelector('.close-btn');

    // Función para mostrar detalles de la APK
    window.showDetails = (versionId) => {
        const modalBody = document.getElementById('modal-body');
        
        // Simulación de base de datos (Luego podemos hacerlo real)
        const versions = {
            'v126': {
                title: "Minecraft v1.26.10 PRO",
                desc: "Esta versión incluye soporte para Shaders 4D, optimización de renderizado y desbloqueo de skins premium.",
                size: "185 MB",
                author: "ErickDev"
            }
        };

        const data = versions[versionId];

        if (data) {
            modalBody.innerHTML = `
                <h2 style="color: var(--main-color); margin-bottom: 15px;">${data.title}</h2>
                <p style="margin-bottom: 20px;">${data.desc}</p>
                <ul style="list-style: none; color: var(--text-secondary); font-size: 0.9rem;">
                    <li><strong>Tamaño:</strong> ${data.size}</li>
                    <li><strong>Desarrollador:</strong> ${data.author}</li>
                </ul>
                <div style="margin-top: 25px;">
                    <a href="#" class="btn-download" style="display: block; text-align: center;">Confirmar Descarga</a>
                </div>
            `;
            modal.style.display = "flex";
        }
    };

    // Cerrar modal al tocar la X o fuera de la ventana
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }
    
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };

    // 3. EFECTO DE APARICIÓN (SCROLL REVEAL)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.apk-card').forEach(card => {
        observer.observe(card);
    });
});

// 4. INICIALIZACIÓN DE GOOGLE AUTH (Básico)
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    alert("¡Sesión iniciada correctamente, Erick!");
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "TU_CLIENTE_ID_AQUI.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", type: "standard", shape: "pill" }
    );
};
