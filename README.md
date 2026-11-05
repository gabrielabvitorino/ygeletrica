# YG Elétrica | LP Black Friday: Diagnóstico de Energia

Landing page estática (HTML, CSS e JS puros, sem framework) para a campanha de diagnóstico de energia em Uberlândia-MG.

## Publicar no GitHub Pages

1. Crie o repositório e envie estes arquivos na raiz (`index.html` precisa ficar na raiz).
2. Em **Settings > Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em alguns minutos o site abre em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Domínio próprio: informe em **Settings > Pages > Custom domain** e ative **Enforce HTTPS**.

## Antes de divulgar

- [ ] Trocar `[Nome da cliente]` (2 lugares) e `[datas da campanha]` no `index.html` (procure por `class="pend"`).
- [ ] Ao trocar, remover a marcação `<mark class="pend">` para sumir o destaque tracejado.
- [ ] Inserir o vídeo da cliente no bloco `.video` (um comentário no HTML indica onde). Use `<video controls playsinline preload="none" poster="...">`.
- [ ] Descomentar `canonical`, `og:url` e `og:image` no `<head>` e trocar `SEU-DOMINIO` pelo endereço final. A pré-visualização do WhatsApp e do Instagram só funciona com URL absoluta.
- [ ] Ligar o formulário a um destino real (CRM, planilha ou webhook). Procure por `TODO` em `main.js`. Sem isso, os dados só vão na mensagem de WhatsApp.
- [ ] Conferir o número do WhatsApp (`WA_NUMBER` em `main.js`) e a mensagem pré-preenchida.
- [ ] Se for usar GA4, Google Ads ou Pixel, colocar os scripts no `<head>`. Os cliques e o envio do formulário já alimentam `window.dataLayer`.

Trocar o domínio nas três tags de uma vez:

```bash
sed -i 's#SEU-DOMINIO#www.seudominio.com.br#g' index.html
```

## Estrutura

```
index.html                 página (conteúdo e SEO)
style.css                  estilos legíveis (edite este)
style.min.css              estilos minificados (carregado pela página)
main.js                    WhatsApp, máscara de telefone, calendário e formulário (edite este)
main.min.js                versão minificada (carregada pela página)
*.webp, *.jpg, *.svg       logo, favicon, foto do hero, textura e og.jpg (compartilhamento)
*.woff2                    fontes Montserrat, Barlow e Barlow Condensed (hospedadas aqui)
```

Esta versão não usa pastas: todos os arquivos ficam na raiz, o que permite enviar tudo de uma vez pelo botão "choose your files" do GitHub.

Depois de editar `style.css` ou `main.js`, gere as versões minificadas:

```bash
npm install
npm run build
```

Para ver no computador: `npm start` e abra http://localhost:8080.

## Se a LP ficar dentro do site principal

A copy sugere a URL `/diagnostico-conta-de-energia-uberlandia`. Coloque todo o conteúdo desta pasta em uma pasta com esse nome. Os caminhos são relativos, então nada quebra. Ajuste `canonical`, `og:url` e `og:image` para essa URL.

## Identidade visual

Segue o design system da YG Elétrica (preto noturno, ouro elétrico, prata cromada). Cores e espaçamentos estão como variáveis no começo de `style.css`.
