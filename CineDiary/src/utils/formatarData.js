export const formatarData = (data) => {
    if (!data) return "";
    const partes_data = data.split("-");
    if (partes_data.length !== 3) return data;
    const [ano, mes, dia] = partes_data;
    return `${dia}/${mes}/${ano}`;
};
