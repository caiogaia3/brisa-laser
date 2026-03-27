import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const claudePath = path.join(projectRoot, 'CLAUDE.md');
const historyPath = path.join(projectRoot, 'archive', 'history_sessions.md');

function runSnapshot() {
    console.log('🧹 [Context Sync] Iniciando limpeza e snapshot da memória...');
    
    if (!fs.existsSync(claudePath)) {
        console.error('❌ ERRO: CLAUDE.md não encontrado!');
        return;
    }
    
    let claudeContent = fs.readFileSync(claudePath, 'utf8');
    
    // Regex para pegar tudo embaixo de "Caixa de Saída"
    const outboxRegex = /## 📥 Caixa de Saída \(Prontos para Arquivar\)\n([\s\S]*?)(?=\n##|$)/;
    const match = claudeContent.match(outboxRegex);
    
    if (!match || !match[1].trim() || match[1].trim().startsWith('*(O script')) {
        console.log('✨ [Context Sync] Nada novo para arquivar no CLAUDE.md.');
        return;
    }
    
    const itemsToArchive = match[1].trim();
    
    // Extraindo itens marcados com [x]
    const lines = itemsToArchive.split('\n');
    const completedItems = lines.filter(line => line.toLowerCase().includes('[x]'));
    
    if (completedItems.length === 0) {
        console.log('✨ [Context Sync] Nenhuma tarefa marcada como concluída [x] para arquivar.');
        return;
    }

    // Montando bloco para o Histórico Histórico
    const today = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date());
    const archiveBlock = `\n### 📦 Snapshot (${today})\n` + completedItems.join('\n') + '\n';
    
    let historyContent = '';
    if (fs.existsSync(historyPath)) {
        historyContent = fs.readFileSync(historyPath, 'utf8');
    } else {
        historyContent = '# 📜 Histórico de Sessões\n\n';
    }
    
    // Adiciona ao final
    historyContent += archiveBlock;
    
    // Poda de emergência (Hard limit)
    const historyLines = historyContent.split('\n');
    if (historyLines.length > 400) {
        console.log('⚠️ [Context Sync] Histórico longo. Podando registros muito velhos para economia de tokens...');
        const header = historyLines.slice(0, 10);
        const tail = historyLines.slice(-300);
        historyContent = header.join('\n') + '\n\n...\n[Registros muito antigos foram podados pelo Context Sync para economizar tokens]\n...\n\n' + tail.join('\n');
    }
    
    fs.writeFileSync(historyPath, historyContent);
    console.log(`✅ [Context Sync] Arquivados ${completedItems.length} itens no history_sessions.md`);
    
    // Limpar o CLAUDE.md para resetar tokens gastos
    const newClaudeContent = claudeContent.replace(outboxRegex, '## 📥 Caixa de Saída (Prontos para Arquivar)\n*(O script `npm run context:sync` moverá os itens daqui com `[x]` para o histórico e limpará esta sessão)*\n');
    fs.writeFileSync(claudePath, newClaudeContent);
    console.log('🧼 [Context Sync] CLAUDE.md limpo com sucesso. Ganhos de token ativos!');
}

runSnapshot();
