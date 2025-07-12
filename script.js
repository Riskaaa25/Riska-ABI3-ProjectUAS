  // JavaScript untuk Toko Online
    document.addEventListener("DOMContentLoaded", () => {
      const sections = document.querySelectorAll(".section");
      const cartItemsEl = document.getElementById("cart-items");
      const cartCountEl = document.getElementById("cart-count");
      const cartTotalEl = document.getElementById("cart-total");
      const notificationEl = document.getElementById("notification");

      let cart = [];

      // Navigasi section
      document.querySelectorAll("[data-section]").forEach(link => {
        link.addEventListener("click", e => {
          e.preventDefault();
          const target = link.getAttribute("data-section");
          sections.forEach(sec => sec.classList.remove("active"));
          document.getElementById(target).classList.add("active");
        });
      });

     // Scroll produk
      document.querySelectorAll(".scroll-arrow").forEach(btn => {
        btn.addEventListener("click", () => {
          const dir = parseInt(btn.dataset.scroll);
          document.getElementById("product-grid").scrollBy({ left: dir * 300, behavior: "smooth" });
        });
      });

      // Tambah ke keranjang
      window.addToCart = function(id, name, price) {
        const existing = cart.find(i => i.id === id);
        if (existing) {
          existing.quantity++;
        } else {
          cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
        showNotification(`${name} berhasil ditambahkan!`);
      };

      // Tampilkan detail produk
      window.showProductDetail = function(name, desc, price, img) {
        document.getElementById("detail-image").src = img;
        document.getElementById("detail-title").textContent = name;
        document.getElementById("detail-description").innerHTML = desc;
        document.getElementById("detail-price").textContent = `Harga: Rp ${price.toLocaleString()}`;
        sections.forEach(s => s.classList.remove("active"));
        document.getElementById("product-detail").classList.add("active");
      };

      // Update tampilan keranjang
      function updateCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;
        let totalItems = 0;

        cart.forEach(item => {
          total += item.price * item.quantity;
          totalItems += item.quantity;

          const div = document.createElement("div");
          div.className = "cart-item";
          div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="quantity">
              <button onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
          `;
          cartItemsEl.appendChild(div);
        });
        
        cartCountEl.textContent = cart.reduce((s, i) => s + i.quantity, 0);
        cartTotalEl.textContent = `Rp ${total.toLocaleString()}`;
        const totalItemsEl = document.getElementById("total-items");
          if (totalItemsEl) {
        totalItemsEl.textContent = totalItems;
      }
      }

      // Ubah jumlah item di keranjang
      window.changeQty = function(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.quantity += delta;
        if (item.quantity < 1) cart = cart.filter(i => i.id !== id);
        updateCart();
      };

      // Tampilkan notifikasi
      function showNotification(message) {
        notificationEl.textContent = message;
        notificationEl.style.display = "block";
        setTimeout(() => {
          notificationEl.style.display = "none";
        }, 2500);
      }

      // Kirim pesan WhatsApp
      document.getElementById("wa-button").addEventListener("click", () => {
        if (cart.length === 0) return alert("Keranjang kosong!");
        let pesan = "Halo, saya ingin memesan:\n";
        let total = 0;
        cart.forEach(item => {
          pesan += `- ${item.name} x${item.quantity}\n`;
          total += item.price * item.quantity;
        });
        pesan += `Total Harga: Rp${total.toLocaleString()}\n\nTerima kasih!`;
        const encoded = encodeURIComponent(pesan);
        const nomor = "6283194479799"
        const url = `https://wa.me/${nomor}?text=${encoded}`;
        window.open(url, '_blank');
      });

        // Event ketika form disubmit
        document.getElementById("form-kontak").addEventListener("submit", function(e) {
          e.preventDefault(); // Mencegah reload halaman saat submit

        // Ambil nilai input dari form
          const nama = document.getElementById("nama").value;
          const email = document.getElementById("email").value;
          const pesan = document.getElementById("pesan").value;

        // Tampilkan status berhasil (simulasi)
          document.getElementById("status-kirim").textContent = "Pesan berhasil dikirim!";

        // Reset isi form setelah dikirim
          this.reset();
        });
    });