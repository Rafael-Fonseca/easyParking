Setup:
1° - Download this repository and add it to an expo project.

2° - Change the importation in the file AppEntry.js in ".../node_modules/expo/"
from:   import App from '../../App';
to:     import App from '../../src/App';

3° - Update the files env_sample.env,
knexfile_sample.js

4° - In the root of your project, create one folder called tickets

5° - Através do seu terminal, ou gerenciador de banco de dados crie o seu BD.

6° - Rode o arquivo /easyParking/server.js ele irá criar as tabelas do banco.
pare o servidor.

7° - Popule tb_roles pelo terminal ou SGBD, a ordem inicial deve ser:
insert into td_roles (role, discount, is_active) values ('user', 0, true);
insert into td_roles (role, discount, is_active) values ('employee', 0, true);
insert into td_roles (role, discount, is_active) values ('admin', 1, true);

8° - Se você não seguiu o passo 7 corretamente será necessário ajustar o arquivo
easyParking/api/user.js, na parte onde o código decide entre o valor enviado na
requisição para fk_roles_user || o valor do usuário padrão (PK gerada na sua inserção)

9° - Descomente o que for necessário em easyParking/test/api.test.js
Dentro do describe Test user.js para realizar a inclusão do administrador base.
Não pode ser inserido via terminal, isso fará com que a senha do admin não seja
criptografada e como consequência, no processo de login a comparação entre senha
criptografada e descriptografada será False e portanto, o login não será 
realizado.

Para rodar o arquivo citado, com o terminal no diretório easyParking, utilize o comando, npm run test.

10° - Suba o servidor novamente.

11° - Acesse o sistema com o usuário admin e configure um custo por minuto
estacionado inicial, acessando a opção gerenciar tickets.
Lembrar que o separador entre reais e centavos deve ser o PONTO e não a vírgula.

12° - Lembrar que antes de cadastrar uma oferta é necessário cadastrar uma
empresa.