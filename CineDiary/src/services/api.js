const API_URL = "http://localhost:3000/api";

export const getAvaliacoes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar as avaliações");
  return response.json();
};

export const createAvaliacao = async (avaliacao) => {
  try{

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avaliacao),
    });
    if (!response.ok) throw new Error("Erro ao adicionar o filme/série");
    return response;
  }catch{
    throw new Error('falha ao criar avaliação')
  }
};

export const updateAvaliacao = async (id, avaliacao) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avaliacao),
  });
  if (!response.ok) throw new Error("Erro ao editar o filme/série");
  return response;
};

export const deleteAvaliacao = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao excluir o filme/série");
  return response;
};
