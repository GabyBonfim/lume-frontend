export async function conversarComLumIA(mensagem: string): Promise<string> {
  try {
    const resp = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem }),
    });

    if (!resp.ok) {
      console.error("Erro na API:", resp.status);
      return "Erro ao se comunicar com a LUM.IA.";
    }

    const json = await resp.json();
    return json.resposta || "Erro inesperado: resposta vazia.";
  } catch (e) {
    console.error("Erro no front ao chamar LUM.IA:", e);
    return "Erro ao processar sua mensagem.";
  }
}
