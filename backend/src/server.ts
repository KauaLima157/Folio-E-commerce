import app from './app';
import Logger from './infrastructure/logger';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  Logger.info(`🚀 Servidor Folio rodando na porta ${PORT}`);
  Logger.debug('Modo Debug Ativado');
});
