# 🚀 Gemini CLI OpenAI Worker

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mrproper)

Ubah model Gemini Google menjadi endpoint yang kompatibel dengan OpenAI menggunakan Cloudflare Workers. Akses model AI tercanggih Google melalui pola API OpenAI yang familiar, didukung oleh otentikasi OAuth2 dan infrastruktur yang sama yang menggerakkan Gemini CLI resmi.

## ✨ Fitur

- 🔐 **Otentikasi OAuth2** - Tidak memerlukan kunci API, menggunakan akun Google Anda
- 🎯 **API Kompatibel OpenAI** - Pengganti langsung untuk endpoint OpenAI
- 📚 **Dukungan OpenAI SDK** - Bekerja dengan OpenAI SDK dan pustaka resmi
- 🖼️ **Dukungan Visi** - Percakapan multi-modal dengan gambar (base64 & URL)
- 🔧 **Dukungan Pemanggilan Alat** - Pemanggilan fungsi dengan integrasi Gemini API
- 🧠 **Penalaran Tingkat Lanjut** - Dukungan untuk kemampuan berpikir Gemini dengan kontrol upaya
- 🛡️ **Keamanan Konten** - Pengaturan moderasi Gemini yang dapat dikonfigurasi
- 🌐 **Integrasi Pihak Ketiga** - Kompatibel dengan Open WebUI, klien ChatGPT, dan lainnya
- ⚡ **Cloudflare Workers** - Penyebaran edge global dengan latensi rendah
- 🔄 **Caching Token Cerdas** - Manajemen token cerdas dengan penyimpanan KV
- 🆓 **Akses Tingkat Gratis** - Manfaatkan tingkat gratis Google melalui API Code Assist
- 📡 **Streaming Real-time** - Server-sent events untuk respons langsung dengan penggunaan token
- 🎭 **Beberapa Model** - Akses ke model Gemini terbaru termasuk yang eksperimental

## 🤖 Model yang Didukung

| ID Model                | Jendela Konteks | Maks Token | Dukungan Berpikir | Deskripsi                                                           |
| ----------------------- | --------------- | ---------- | ----------------- | ------------------------------------------------------------------- |
| `gemini-2.5-pro`        | 1M              | 65K        | ✅                | Model Gemini 2.5 Pro terbaru dengan kemampuan penalaran             |
| `gemini-2.5-flash`      | 1M              | 65K        | ✅                | Model Gemini 2.5 Flash cepat dengan kemampuan penalaran             |
| `gemini-2.5-flash-lite` | 1M              | 65K        | ✅                | Versi ringan dari model Gemini 2.5 Flash dengan kemampuan penalaran |

> **Catatan:** Model Gemini 2.5 memiliki fitur berpikir yang diaktifkan secara default. API secara otomatis mengelola ini:
>
> - Ketika berpikir nyata dinonaktifkan (lingkungan), anggaran berpikir diatur ke 0 untuk menonaktifkannya
> - Ketika berpikir nyata diaktifkan (lingkungan), anggaran berpikir default ke -1 (alokasi dinamis oleh Gemini)
>
> **Dukungan berpikir** memiliki dua mode:
>
> - **Berpikir palsu**: Atur `ENABLE_FAKE_THINKING=true` untuk menghasilkan teks penalaran sintetis (baik untuk pengujian)
> - **Berpikir nyata**: Atur `ENABLE_REAL_THINKING=true` untuk menggunakan kemampuan penalaran asli Gemini
>
> Berpikir nyata sepenuhnya dikendalikan oleh variabel lingkungan `ENABLE_REAL_THINKING`. Anda dapat secara opsional mengatur `"thinking_budget"` dalam permintaan Anda (batas token untuk penalaran, -1 untuk alokasi dinamis, 0 untuk menonaktifkan berpikir sepenuhnya).

- **Dukungan Upaya Penalaran**: Anda dapat mengontrol upaya penalaran model berpikir dengan menyertakan `reasoning_effort` dalam badan permintaan (misalnya, `extra_body` atau `model_params`). Parameter ini memungkinkan Anda untuk menyempurnakan proses penalaran internal model, menyeimbangkan antara kecepatan dan kedalaman pemikiran.
  - `none`: Menonaktifkan berpikir (`thinking_budget = 0`).
  - `low`: Mengatur `thinking_budget = 1024`.
  - `medium`: Mengatur `thinking_budget = 12288` untuk model flash, `16384` untuk model lain.
  - `high`: Mengatur `thinking_budget = 24576` untuk model flash, `32768` untuk model lain.
    > Atur `STREAM_THINKING_AS_CONTENT=true` untuk mengalirkan penalaran sebagai konten dengan tag `<thinking>` (gaya DeepSeek R1) alih-alih menggunakan bidang penalaran.

## 🛠️ Pengaturan

### Prasyarat

1. **Akun Google** dengan akses ke Gemini
2. **Akun Cloudflare** dengan Workers diaktifkan
3. **Wrangler CLI** terinstal (`npm install -g wrangler`)

### Langkah 1: Dapatkan Kredensial OAuth2

Anda memerlukan kredensial OAuth2 dari akun Google yang telah mengakses Gemini. Cara termudah untuk mendapatkannya adalah melalui Gemini CLI resmi.

#### Menggunakan Gemini CLI

1. **Instal Gemini CLI**:

   ```bash
   npm install -g @google/gemini-cli
   ```

2. **Mulai Gemini CLI**:
   ```bash
   gemini
   ```
3. **Otentikasi dengan Google**:

   Pilih `● Login with Google`.

   Jendela browser akan terbuka yang meminta Anda untuk masuk dengan akun Google Anda.

4. **Temukan file kredensial**:

   **Windows:**

   ```
   C:\Users\USERNAME\.gemini\oauth_creds.json
   ```

   **macOS/Linux:**

   ```
   ~/.gemini/oauth_creds.json
   ```

5. **Salin kredensial**:
   File tersebut berisi JSON dalam format ini:
   ```json
   {
   	"access_token": "ya29.a0AS3H6Nx...",
   	"refresh_token": "1//09FtpJYpxOd...",
   	"scope": "https://www.googleapis.com/auth/cloud-platform ...",
   	"token_type": "Bearer",
   	"id_token": "eyJhbGciOiJSUzI1NiIs...",
   	"expiry_date": 1750927763467
   }
   ```

### Langkah 2: Buat Namespace KV

```bash
# Buat namespace KV untuk caching token
wrangler kv namespace create "GEMINI_CLI_KV"
```

Catat ID namespace yang dikembalikan.
Perbarui `wrangler.toml` dengan ID namespace KV Anda:

```toml
kv_namespaces = [
  { binding = "GEMINI_CLI_KV", id = "your-kv-namespace-id" }
]
```

### Langkah 3: Pengaturan Lingkungan

Buat file `.dev.vars`:

```bash
# Wajib: JSON kredensial OAuth2 dari otentikasi Gemini CLI
GCP_SERVICE_ACCOUNT={"access_token":"ya29...","refresh_token":"1//...","scope":"...","token_type":"Bearer","id_token":"eyJ...","expiry_date":1750927763467}

# Opsional: ID Proyek Google Cloud (ditemukan secara otomatis jika tidak diatur)
# GEMINI_PROJECT_ID=your-project-id

# Opsional: Kunci API untuk otentikasi (jika tidak diatur, API bersifat publik)
# Ketika diatur, klien harus menyertakan header "Authorization: Bearer <your-api-key>"
# Contoh: sk-1234567890abcdef1234567890abcdef
OPENAI_API_KEY=sk-your-secret-api-key-here
```

Untuk produksi, atur rahasia:

```bash
wrangler secret put GCP_SERVICE_ACCOUNT
wrangler secret put OPENAI_API_KEY  # Opsional, hanya jika Anda ingin otentikasi
```

### Langkah 4: Deploy

```bash
# Instal dependensi
npm install

# Deploy ke Cloudflare Workers
npm run deploy

# Atau jalankan secara lokal untuk pengembangan
npm run dev
```

## 🔧 Konfigurasi

### Variabel Lingkungan

#### Konfigurasi Inti

| Variabel              | Wajib | Deskripsi                                                             |
| --------------------- | ----- | --------------------------------------------------------------------- |
| `GCP_SERVICE_ACCOUNT` | ✅    | String JSON kredensial OAuth2.                                        |
| `GEMINI_PROJECT_ID`   | ❌    | ID Proyek Google Cloud (ditemukan secara otomatis jika tidak diatur). |
| `OPENAI_API_KEY`      | ❌    | Kunci API untuk otentikasi. Jika tidak diatur, API bersifat publik.   |

#### Berpikir & Penalaran

| Variabel                     | Deskripsi                                                                   |
| ---------------------------- | --------------------------------------------------------------------------- |
| `ENABLE_FAKE_THINKING`       | Aktifkan output berpikir sintetis untuk pengujian (atur ke `"true"`).       |
| `ENABLE_REAL_THINKING`       | Aktifkan output berpikir Gemini nyata (atur ke `"true"`).                   |
| `STREAM_THINKING_AS_CONTENT` | Alirkan berpikir sebagai konten dengan tag `<thinking>` (gaya DeepSeek R1). |

#### Model & Bendera Fitur

| Variabel                      | Deskripsi                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `ENABLE_AUTO_MODEL_SWITCHING` | Aktifkan fallback otomatis dari model pro ke flash pada batas laju (atur ke `"true"`).              |
| `ENABLE_GEMINI_NATIVE_TOOLS`  | Sakelar utama untuk mengaktifkan semua alat asli (atur ke `"true"`).                                |
| `ENABLE_GOOGLE_SEARCH`        | Aktifkan alat asli Google Search (atur ke `"true"`).                                                |
| `ENABLE_URL_CONTEXT`          | Aktifkan alat asli URL Context (atur ke `"true"`).                                                  |
| `GEMINI_TOOLS_PRIORITY`       | Atur prioritas alat: `"native_first"` atau `"custom_first"`.                                        |
| `ALLOW_REQUEST_TOOL_CONTROL`  | Izinkan parameter permintaan untuk menimpa pengaturan alat (atur ke `"false"` untuk menonaktifkan). |
| `ENABLE_INLINE_CITATIONS`     | Suntikkan kutipan markdown untuk hasil pencarian (atur ke `"true"` untuk mengaktifkan).             |
| `INCLUDE_GROUNDING_METADATA`  | Sertakan metadata dasar mentah dalam aliran (atur ke `"false"` untuk menonaktifkan).                |

#### Keamanan Konten

| Variabel                                        | Deskripsi                                                       |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `GEMINI_MODERATION_HARASSMENT_THRESHOLD`        | Mengatur ambang moderasi untuk konten pelecehan.                |
| `GEMINI_MODERATION_HATE_SPEECH_THRESHOLD`       | Mengatur ambang moderasi untuk konten ujaran kebencian.         |
| `GEMINI_MODERATION_SEXUALLY_EXPLICIT_THRESHOLD` | Mengatur ambang moderasi untuk konten eksplisit secara seksual. |
| `GEMINI_MODERATION_DANGEROUS_CONTENT_THRESHOLD` | Mengatur ambang moderasi untuk konten berbahaya.                |

_Untuk ambang keamanan, opsi yang valid adalah: `BLOCK_NONE`, `BLOCK_FEW`, `BLOCK_SOME`, `BLOCK_ONLY_HIGH`, `HARM_BLOCK_THRESHOLD_UNSPECIFIED`._

**Keamanan Otentikasi:**

- Ketika `OPENAI_API_KEY` diatur, semua endpoint `/v1/*` memerlukan otentikasi.
- Klien harus menyertakan header: `Authorization: Bearer <your-api-key>`.
- Tanpa variabel lingkungan ini, API dapat diakses secara publik.
- Format yang direkomendasikan: `sk-` diikuti oleh string acak (misalnya, `sk-1234567890abcdef...`).

**Model Berpikir:**

- **Berpikir Palsu**: Ketika `ENABLE_FAKE_THINKING` diatur ke `"true"`, model yang ditandai dengan `thinking: true` akan menghasilkan teks penalaran sintetis sebelum respons sebenarnya.
- **Berpikir Nyata**: Ketika `ENABLE_REAL_THINKING` diatur ke `"true"`, permintaan dengan `include_reasoning: true` akan menggunakan kemampuan berpikir asli Gemini.
- Berpikir nyata memberikan penalaran asli dari Gemini dan memerlukan model yang mampu berpikir (seperti Gemini 2.5 Pro/Flash).
- Anda dapat mengontrol anggaran token penalaran dengan parameter `thinking_budget`.
- Secara default, output penalaran dialirkan sebagai potongan `reasoning` dalam format respons yang kompatibel dengan OpenAI.
- Ketika `STREAM_THINKING_AS_CONTENT` juga diatur ke `"true"`, penalaran akan dialirkan sebagai konten reguler yang dibungkus dalam tag `<thinking></thinking>` (gaya DeepSeek R1).
- **UX yang Dioptimalkan**: Tag `</thinking>` hanya dikirim ketika respons LLM yang sebenarnya dimulai, menghilangkan jeda canggung antara berpikir dan respons.
- Jika tidak ada mode berpikir yang diaktifkan, model berpikir akan berperilaku seperti model biasa.

**Pengalihan Model Otomatis:**

- Ketika `ENABLE_AUTO_MODEL_SWITCHING` diatur ke `"true"`, sistem akan secara otomatis beralih dari `gemini-2.5-pro` ke `gemini-2.5-flash` ketika menghadapi kesalahan batas laju (HTTP 429 atau 503).
- Ini memberikan kontinuitas tanpa batas ketika kuota model Pro habis.
- Pengalihan ditunjukkan dalam respons dengan pesan notifikasi.
- Hanya berlaku untuk pasangan model yang didukung (saat ini: pro → flash).
- Bekerja untuk permintaan streaming dan non-streaming.

### Namespace KV

| Binding         | Tujuan                           |
| --------------- | -------------------------------- |
| `GEMINI_CLI_KV` | Caching token dan manajemen sesi |

## 🚨 Pemecahan Masalah

### Masalah Umum

**Kesalahan Otentikasi 401**

- Periksa apakah kredensial OAuth2 Anda valid
- Pastikan token refresh berfungsi
- Verifikasi format kredensial cocok persis

**Gagal Memperbarui Token**

- Kredensial mungkin berasal dari klien OAuth2 yang salah
- Token refresh mungkin kedaluwarsa atau dicabut
- Periksa endpoint cache debug untuk status token

**Gagal Menemukan ID Proyek**

- Atur variabel lingkungan `GEMINI_PROJECT_ID` secara manually
- Pastikan akun Google Anda memiliki akses ke Gemini

## 💻 Contoh Penggunaan

### Integrasi Cline

[Cline](https://github.com/cline/cline) adalah ekstensi asisten AI yang kuat untuk VS Code. Anda dapat dengan mudah mengkonfigurasinya untuk menggunakan model Gemini Anda:

1. **Instal Cline** di VS Code dari marketplace Ekstensi

2. **Konfigurasi pengaturan OpenAI API**:
   - Buka pengaturan Cline
   - Atur **Penyedia API** ke "OpenAI"
   - Atur **URL Dasar** ke: `https://your-worker.workers.dev/v1`
   - Atur **Kunci API** ke: `sk-your-secret-api-key-here` (gunakan OPENAI_API_KEY Anda jika otentikasi diaktifkan)

3. **Pilih model**:
   - Pilih `gemini-2.5-pro` untuk tugas penalaran yang kompleks
   - Pilih `gemini-2.5-flash` untuk respons yang lebih cepat

### Integrasi Open WebUI

1. **Tambahkan sebagai endpoint yang kompatibel dengan OpenAI**:
   - URL Dasar: `https://your-worker.workers.dev/v1`
   - Kunci API: `sk-your-secret-api-key-here` (gunakan OPENAI_API_KEY Anda jika otentikasi diaktifkan)

2. **Konfigurasi model**:
   Open WebUI akan secara otomatis menemukan model Gemini yang tersedia melalui endpoint `/v1/models`.

3. **Mulai mengobrol**:
   Gunakan model Gemini apa pun seperti Anda menggunakan model OpenAI!

### Integrasi LiteLLM

[LiteLLM](https://github.com/BerriAI/litellm) bekerja dengan mulus dengan worker ini, terutama saat menggunakan aliran berpikir gaya DeepSeek R1:

```python
import litellm

# Konfigurasi LiteLLM untuk menggunakan worker Anda
litellm.api_base = "https://your-worker.workers.dev/v1"
litellm.api_key = "sk-your-secret-api-key-here"

# Gunakan model berpikir dengan LiteLLM
response = litellm.completion(
    model="gemini-2.5-flash",
    messages=[
        {"role": "user", "content": "Selesaikan ini langkah demi langkah: Berapa 15 * 24?"}
    ],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

**Tips Pro**: Atur `STREAM_THINKING_AS_CONTENT=true` untuk kompatibilitas LiteLLM yang optimal. Format tag `<thinking>` bekerja lebih baik dengan parsing LiteLLM dan berbagai alat hilir.

### OpenAI SDK (Python)

```python
from openai import OpenAI

# Inisialisasi dengan endpoint worker Anda
client = OpenAI(
    base_url="https://your-worker.workers.dev/v1",
    api_key="sk-your-secret-api-key-here"  # Gunakan OPENAI_API_KEY Anda jika otentikasi diaktifkan
)

# Penyelesaian obrolan
response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role": "system", "content": "Anda adalah asisten yang membantu."},
        {"role": "user", "content": "Jelaskan pembelajaran mesin dalam istilah sederhana"}
    ],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")

# Mode berpikir nyata
response = client.chat.completions.create(
    model="gemini-2.5-pro",
    messages=[
        {"role": "user", "content": "Selesaikan ini langkah demi langkah: Berapa turunan dari x^3 + 2x^2 - 5x + 3?"}
    ],
    extra_body={
        "include_reasoning": True,
        "thinking_budget": 1024
    },
    stream=True
)

for chunk in response:
    # Pemikiran nyata muncul di bidang penalaran
    if hasattr(chunk.choices[0].delta, 'reasoning') and chunk.choices[0].delta.reasoning:
        print(f"[Berpikir] {chunk.choices[0].delta.reasoning}")
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### OpenAI SDK (JavaScript/TypeScript)

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
	baseURL: "https://your-worker.workers.dev/v1",
	apiKey: "sk-your-secret-api-key-here" // Gunakan OPENAI_API_KEY Anda jika otentikasi diaktifkan
});

const stream = await openai.chat.completions.create({
	model: "gemini-2.5-flash",
	messages: [{ role: "user", content: "Tulis haiku tentang coding" }],
	stream: true
});

for await (const chunk of stream) {
	const content = chunk.choices[0]?.delta?.content || "";
	process.stdout.write(content);
}
```

### cURL

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-secret-api-key-here" \
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [
      {"role": "user", "content": "Jelaskan komputasi kuantum"}
    ]
  }'
```

### JavaScript/TypeScript Mentah

```javascript
const response = await fetch("https://your-worker.workers.dev/v1/chat/completions", {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		model: "gemini-2.5-flash",
		messages: [{ role: "user", content: "Halo, dunia!" }]
	})
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
	const { done, value } = await reader.read();
	if (done) break;

	const chunk = decoder.decode(value);
	const lines = chunk.split("\n");

	for (const line of lines) {
		if (line.startsWith("data: ") && line !== "data: [DONE]") {
			const data = JSON.parse(line.substring(6));
			const content = data.choices[0]?.delta?.content;
			if (content) {
				console.log(content);
			}
		}
	}
}
```

### Python Mentah (tanpa SDK)

```python
import requests
import json

url = "https://your-worker.workers.dev/v1/chat/completions"
data = {
    "model": "gemini-2.5-flash",
    "messages": [
        {"role": "user", "content": "Tulis fungsi Python untuk menghitung fibonacci"}
    ]
}

response = requests.post(url, json=data, stream=True)

for line in response.iter_lines():
    if line and line.startswith(b'data: '):
        try:
            chunk = json.loads(line[6:].decode())
            content = chunk['choices'][0]['delta'].get('content', '')
            if content:
                print(content, end='')
        except json.JSONDecodeError:
            continue
```

## 🛠️ Dukungan Pemanggilan Alat

Worker ini mendukung pemanggilan alat yang kompatibel dengan OpenAI (pemanggilan fungsi) dengan integrasi mulus ke kemampuan pemanggilan fungsi Gemini.

### Menggunakan Panggilan Alat

Sertakan `tools` dan secara opsional `tool_choice` dalam permintaan Anda:

```javascript
const response = await fetch("/v1/chat/completions", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		model: "gemini-2.5-pro",
		messages: [{ role: "user", content: "Bagaimana cuaca di New York?" }],
		tools: [
			{
				type: "function",
				function: {
					name: "get_weather",
					description: "Dapatkan informasi cuaca untuk suatu lokasi",
					parameters: {
						type: "object",
						properties: {
							location: { type: "string", description: "Nama kota" }
						},
						required: ["location"]
					}
				}
			}
		],
		tool_choice: "auto"
	})
});
```

### Opsi Pilihan Alat

- `auto`: Biarkan model memutuskan apakah akan memanggil fungsi
- `none`: Nonaktifkan pemanggilan fungsi
- `{"type": "function", "function": {"name": "function_name"}}`: Paksa panggilan fungsi tertentu

## 🛡️ Pengaturan Keamanan Konten

Konfigurasi filter keamanan bawaan Gemini menggunakan variabel lingkungan di dev.vars:

```bash
# Opsi ambang keamanan: BLOCK_NONE, BLOCK_FEW, BLOCK_SOME, BLOCK_ONLY_HIGH, HARM_BLOCK_THRESHOLD_UNSPECIFIED
GEMINI_MODERATION_HARASSMENT_THRESHOLD=BLOCK_NONE
GEMINI_MODERATION_HATE_SPEECH_THRESHOLD=BLOCK_NONE
GEMINI_MODERATION_SEXUALLY_EXPLICIT_THRESHOLD=BLOCK_SOME
GEMINI_MODERATION_DANGEROUS_CONTENT_THRESHOLD=BLOCK_ONLY_HIGH
```

**Kategori Keamanan:**

- `HARASSMENT`: Konten yang mempromosikan kebencian atau kekerasan terhadap individu/kelompok
- `HATE_SPEECH`: Bahasa merendahkan atau meremehkan yang menargetkan kelompok tertentu
- `SEXUALLY_EXPLICIT`: Konten yang mengandung materi seksual atau dewasa
- `DANGEROUS_CONTENT`: Konten yang mempromosikan aktivitas berbahaya

## 📡 Endpoint API

### URL Dasar

```
https://your-worker.your-subdomain.workers.dev
```

### Daftar Model

```http
GET /v1/models
```

**Respons:**

```json
{
	"object": "list",
	"data": [
		{
			"id": "gemini-2.5-pro",
			"object": "model",
			"created": 1708976947,
			"owned_by": "google-gemini-cli"
		}
	]
}
```

### Penyelesaian Obrolan

```http
POST /v1/chat/completions
Content-Type: application/json

{
  "model": "gemini-2.5-flash",
  "messages": [
    {
      "role": "system",
      "content": "Anda adalah asisten yang membantu."
    },
    {
      "role": "user",
      "content": "Halo! Apa kabar?"
    }
  ]
}
```

#### Mode Berpikir (Penalaran Nyata)

Untuk model yang mendukung berpikir, Anda dapat mengaktifkan penalaran nyata dari Gemini:

```http
POST /v1/chat/completions
Content-Type: application/json

{
  "model": "gemini-2.5-pro",
  "messages": [
    {
      "role": "user",
      "content": "Selesaikan masalah matematika ini langkah demi langkah: Berapa 15% dari 240?"
    }
  ],
  "include_reasoning": true,
  "thinking_budget": 1024
}
```

Parameter `include_reasoning` mengaktifkan mode berpikir asli Gemini, dan `thinking_budget` mengatur batas token untuk penalaran.

**Respons (Streaming):**

```
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1708976947,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"role":"assistant","content":"Halo"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1708976947,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{"content":"! Saya"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1708976947,"model":"gemini-2.5-flash","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":22,"completion_tokens":553,"total_tokens":575}}

data: [DONE]
```

### Endpoint Debug

#### Periksa Cache Token

```http
GET /v1/debug/cache
```

#### Uji Otentikasi

```http
POST /v1/token-test
POST /v1/test
```

### Dukungan Gambar (Visi)

Worker ini mendukung percakapan multimodal dengan gambar untuk model yang mampu visi. Gambar dapat disediakan sebagai URL data yang dikodekan base64 atau sebagai URL eksternal.

#### Format Gambar yang Didukung

- JPEG, PNG, GIF, WebP
- Dikodekan Base64 (direkomendasikan untuk keandalan)
- URL Eksternal (mungkin memiliki batasan dengan beberapa layanan)

#### Model yang Mampu Visi

- `gemini-2.5-pro`
- `gemini-2.5-flash`
- `gemini-2.0-flash-001`
- `gemini-2.0-flash-lite-preview-02-05`
- `gemini-2.0-pro-exp-02-05`

#### Contoh dengan Gambar Base64

```python
from openai import OpenAI
import base64

# Encode gambar Anda
with open("image.jpg", "rb") as image_file:
    base64_image = base64.b64encode(image_file.read()).decode('utf-8')

client = OpenAI(
    base_url="https://your-worker.workers.dev/v1",
    api_key="sk-your-secret-api-key-here"
)

response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Apa yang Anda lihat di gambar ini?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]
)

print(response.choices[0].message.content)
```

#### Contoh dengan URL Gambar

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-secret-api-key-here" \
  -d '{
    "model": "gemini-2.5-pro",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Jelaskan gambar ini secara detail."
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://example.com/image.jpg",
              "detail": "high"
            }
          }
        ]
      }
    ]
  }'
```

#### Beberapa Gambar

Anda dapat menyertakan beberapa gambar dalam satu pesan:

```json
{
	"model": "gemini-2.5-pro",
	"messages": [
		{
			"role": "user",
			"content": [
				{
					"type": "text",
					"text": "Bandingkan kedua gambar ini."
				},
				{
					"type": "image_url",
					"image_url": {
						"url": "data:image/jpeg;base64,..."
					}
				},
				{
					"type": "image_url",
					"image_url": {
						"url": "data:image/png;base64,..."
					}
				}
			]
		}
	]
}
```

### Perintah Debug

```bash
# Periksa status cache KV
curl https://your-worker.workers.dev/v1/debug/cache

# Uji otentikasi saja
curl -X POST https://your-worker.workers.dev/v1/token-test

# Uji alur lengkap
curl -X POST https://your-worker.workers.dev/v1/test
```

## 🏗️ Cara Kerjanya

```mermaid
graph TD
    A[Permintaan Klien] --> B[Cloudflare Worker]
    B --> C{Token di Cache KV?}
    C -->|Ya| D[Gunakan Token yang Dicache]
    C -->|Tidak| E[Periksa Token Lingkungan]
    E --> F{Token Valid?}
    F -->|Ya| G[Cache & Gunakan Token]
    F -->|Tidak| H[Perbarui Token]
    H --> I[Cache Token Baru]
    D --> J[Panggil Gemini API]
    G --> J
    I --> J
    J --> K[Alirkan Respons]
    K --> L[Format OpenAI]
    L --> M[Respons Klien]
```

Worker ini bertindak sebagai lapisan terjemahan, mengubah panggilan API OpenAI ke format API Code Assist Google sambil mengelola otentikasi OAuth2 secara otomatis.

## 🤝 Berkontribusi

1. Fork repositori
2. Buat cabang fitur
3. Lakukan perubahan Anda
4. Uji secara menyeluruh
5. Kirim permintaan tarik

## 📄 Lisensi

Basis kode ini disediakan untuk penggunaan pribadi dan self-hosting saja.

Redistribusi basis kode, baik dalam bentuk asli maupun yang dimodifikasi, tidak diizinkan tanpa persetujuan tertulis sebelumnya dari penulis.

Anda dapat melakukan fork dan memodifikasi repositori semata-mata untuk tujuan menjalankan dan self-hosting instans Anda sendiri.

Bentuk distribusi, sublisensi, atau penggunaan komersial lainnya dilarang keras kecuali diizinkan secara eksplisit.

## 🙏 Ucapan Terima Kasih

- Terinspirasi oleh [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) resmi
- Dibangun di atas [Cloudflare Workers](https://workers.cloudflare.com/)
- Menggunakan kerangka kerja web [Hono](https://hono.dev/)

---

**⚠️ Penting**: Proyek ini menggunakan Google's Code Assist API yang mungkin memiliki batas penggunaan dan persyaratan layanan. Harap pastikan kepatuhan terhadap kebijakan Google saat menggunakan worker ini.

[![Star History Chart](https://api.star-history.com/svg?repos=GewoonJaap/gemini-cli-openai&type=Date)](https://www.star-history.com/#GewoonJaap/gemini-cli-openai&Date)
