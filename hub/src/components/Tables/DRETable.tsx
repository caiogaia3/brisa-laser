import { DataTable } from './DataTable';

export const DRETable = () => {
  // Mock data for DRE Table (would normally be fetched)
  const data = [
    { id: 1, date: '15/03/2026', category: 'Custo Fixo', subcategory: 'Aluguel Matriz', amount: 8500 },
    { id: 2, date: '14/03/2026', category: 'Receita', subcategory: 'Vendas PDV', amount: 3200 },
    { id: 3, date: '12/03/2026', category: 'Custo Variável', subcategory: 'Taxa Cartão', amount: 120 },
    { id: 4, date: '10/03/2026', category: 'Custo Fixo', subcategory: 'Folha Pagamento', amount: 35000 },
  ];

  const columns = [
    { key: 'date', label: 'Data', align: 'left' as const },
    { key: 'category', label: 'Categoria', align: 'left' as const },
    { key: 'subcategory', label: 'Descrição', align: 'left' as const },
    { key: 'amount', label: 'Valor', align: 'right' as const, format: (val: number) => `R$ ${val.toLocaleString('pt-BR')}` },
  ];

  return <DataTable columns={columns} data={data} keyField="id" />;
};
