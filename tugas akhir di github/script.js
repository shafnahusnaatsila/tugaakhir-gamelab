 $(document).ready(function () {
      $('#btnCari').click(function () {
        const makanan = $('#inputMakanan').val().trim();
        if (makanan === '') {
          $('#hasilResep').html('<p style="color:red;">Masukkan nama makanan dulu ya 😊</p>');
          return;
        }

        $('#hasilResep').html('');
        $('#loadingBox').fadeIn();

        $.ajax({
          method: 'GET',
          url: 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=' + encodeURIComponent(makanan),
          headers: {
            'X-RapidAPI-Key': 'f4122b8745mshe64fe16fa23e006p1d78a8jsn404600974716',
            'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
          },
          success: function (response) {
            setTimeout(function () {
              $('#loadingBox').fadeOut();

              if (response.length === 0) {
                $('#hasilResep').html('<p style="color:orange;">Resep tidak ditemukan 😢</p>');
                return;
              }

              const resep = response[0];
              const bahanHTML = `<ul>${
                resep.ingredients
                  .split(/[,|]/)
                  .map(b => `<li>${b.trim()}</li>`)
                  .join('')
              }</ul>`;

              const langkahHTML = resep.instructions
                .split('. ')
                .map(step => `• ${step.trim()}.`)
                .join('<br><br>');

              const hasilFinal = `
                <h3>${resep.title}</h3>
                <p><strong>🍽 Bahan:</strong></p>
                ${bahanHTML}
                <p><strong>📝 Langkah-langkah:</strong></p>
                <p>${langkahHTML}</p>
              `;
              $('#hasilResep').html(hasilFinal);
            }, 1000); 
          },
          error: function () {
            $('#loadingBox').fadeOut();
            $('#hasilResep').html('<p style="color:red;">Terjadi kesalahan saat mengambil data 😔</p>');
          }
        });
      });
    });