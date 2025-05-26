# AULA 01

## Delete (exclusão suave)

- Permite excluir o registro sem a devida exclusão.
- Também conhecido por ocultar sem deletar.
- Denominado por paranoid no model do registro, exemplo:

```
    ...
    },
    {
        sequelize,
        modelName: 'Pessoa',
        tableName: 'pessoas',
        paranoid: true
    }
    ...
```

### Criar migrations

- As migrações devem ter o nome da coluna a ser criada e removida para cada um dos itens
- Os arquivos de migrations deve ter a data, mantendo a sequência após as criações das tabelas

### Executar as migrations

- npx sequelize-cli db:migrate

## Links da aula

    Seguem os links para conteúdos apresentados em vídeo ou citados durante esta aula:

    Documentação do Sequelize: Paranoid; (https://sequelize.org/docs/v6/core-concepts/paranoid/)
    Requisitos do projeto. (https://github.com/alura-cursos/3414-node-sequelize-II/blob/arquivos-iniciais/arquivos-base/requisitos.md)

# AULA 02

## Escopo (scope)

- Serve para definir um escopo padrão, caso não seja informado.
- Escopos definem a abrangência das funcionalidades.
- Exemplo da indicação na tabela pessoa:

```
    ...
    },
    {
        sequelize,
        modelName: 'Pessoa',
        tableName: 'pessoas',
        paranoid: true,
        defaultScope: {
        where: {
            ativo: true
        }
        }
    }
    ...
```

## Validação

- No modelo é possível adicionar a validação dos campos
- Validações realizadas pelo próprio sequelize

```
    ...
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do e-mail inválido'
        }
      }
    },
...
```

- Biblioteca de validação: https://github.com/validatorjs/validator.js

- Outra biblioteca de validação bastante conhecida na comunidade Node.js é a joi (https://joi.dev/). Para uso com TypeScript, uma opção é a lib Zod (https://zod.dev/).

- É possível criar uma validação personalizada, entretanto a diferença é que necessita de se criar a função que fará a validação. Exemplo:

```...
    const isCpfValido = require('../../utils/validaCpfHelpers.js');
    ...
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf) => {
          if(!isCpfValido(cpf)) throw new Error('numero de CPF inválido!');
        }
      }
    },

...
```

```
    module.exports = (cpf) => {
        if(cpf.length != 11) return false;
        return true;
    };
```

## Constraint

- São validações realizadas pelo próprio banco de dados. Exemplo da tag unique:

```
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        cpfEhValido: (cpf) => {
          if(!isCpfValido(cpf)) throw new Error('numero de CPF inválido!');
        }
      }
    },
```

- São constraints em SQL:

  - NOT NULL - garante que não exista nenhum valor NULL na coluna;
  - UNIQUE - garante que não existam valores iguais em uma coluna;
  - PRIMARY KEY - identifica cada linha em uma tabela através de um valor único (junção de NOT NULL e UNIQUE);
  - FOREIGN KEY - identifica um valor único em outra tabela como chave;
  - CHECK - garante que todos os valores em uma coluna satisfazem uma condição específica;
  - DEFAULT - determina um valor padrão caso nenhum valor seja informado;
  - INDEX - para criar índices e facilitar o acesso a determinados conjuntos de dados.

### Algoritmo para validação de CPF

    https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/

## Links da aula

- Documentação do Sequelize:
  - Definição de escopo; (https://sequelize.org/docs/v6/other-topics/scopes/#definition)
  - Conceitos principais de validações e constraints; (https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
  - Diferenças entre validações e constraints; (https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#difference-between-validations-and-constraints)
  - Unique constraint. (https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#unique-constraint)
- Documentação do SQLite
  - CHECK constraint. (https://www.sqlitetutorial.net/sqlite-check-constraint/)
- Expressões regulares (Regex)
  - Documentação sobre regex no MDN; (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  - Artigo: formatando CPF com expressões regulares com algumas práticas de uso; (https://www.alura.com.br/artigos/formatando-cpf-com-ajuda-das-expressoes-regulares)
  - Artigo: manipulação de strings e regex com exemplos de uso de regex com métodos do JavaScript. (https://www.alura.com.br/artigos/javascript-replace-manipulando-strings-e-regex)

# AULA 03

## Associação entre entidades

- Primeiro passo: criar rota:
  - router.post('/pessoas/:estudanteId/matriculas', (req, res) => matriculaController.criaNovo(req, res));

## Mixins:

- classes que contêm métodos que podem ser utilizados por outras classes, sem a necessidade de herança direta.
- A lista de métodos criados automaticamente com as instâncias de modelo são:

  - addModel()
  - addModels()
  - countModels()
  - createModel()
  - getModels()
  - hasModel()
  - hasModels()
  - removeModel()
  - removeModels()
  - setModels()

### Criando novas associações

- Essa era a classe com apenas um escopo adicionado:

```
    Pessoa.hasMany(models.Matricula, {
    foreignKey: 'estudante_id',
    scope: { status: 'matriculado' },
    as: 'aulasMatriculadas'
    });
```

- Pode-se adicionar outros escopos:

```
    Pessoa.hasMany(models.Matricula, {
    foreignKey: 'estudante_id',
    scope: { status: 'matriculado' },
    as: 'aulasMatriculadas'
    });
    Pessoa.hasMany(models.Matricula, {
    foreignKey: 'estudante_id',
    as: 'todasAsMatriculadas'
    });
```

### Links da aula

- Seguem os links para conteúdos apresentados em vídeo ou citados durante esta aula:

  - Método findOne; (https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone)
  - Estrutura do objeto options contendo o where no método update. (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries)

# AULA 04

## OPERADORES

- Quando se necessita de passar parâmetros de forma variável
- Para passarmos as informações para a requisição, podemos utilizar o que chamamos de Query Params ou Query Strings, que são um pouco diferentes dos parâmetros de rota que estamos utilizando.
  - Exemplo: ?data_inicial=2023-01-01&data_final=2023-09-01

## QUERY PARAMS

- Permitem passar parâmetros que não são mapeadas nas rotas
- Então, essa sintaxe utiliza esses operadores que marcam o início com ? e separam parâmetros com o & e o =, para termos chave e valor.
- Essa é a sintaxe dessas Query Strings, que passamos via rota, e a requisição capta esses valores - a rota em si não considera essas Query Strings, ela desconsidera - mas conseguimos usar dentro da requisição.

## eager loading e lazy loading

### lazy loading

- No Sequelize, a estratégia de lazy loading é implementada através dos métodos automáticos criados com as associações entre modelos. Por exemplo:

```
  const estudante = await Pessoa.findOne({
    where: {
      nome: "Roberta Estudante"
    }
  });
  console.log('nome:', estudante.nome);
  console.log('ativo:', estudante.ativo);

  const matriculas = await estudante.getMatriculas();
  console.log('matrículas de estudante:', matriculas);
```

### Eager loading

- Para implementar a estratégia de eager loading usando Sequelize, é possível utilizar uma as propriedades do objeto options, include:

```
  const estudante = await Pessoa.findOne({
    where: {
      name: "Roberta Estudante"
    },
    include: Matricula
  });

  console.log('nome:', estudante.nome);
  console.log('matriculas:', estudante.matricula);
```

## AGRUPAMENTO

- E agrupar registros a partir de uma contagem

### AGRUPAMENTO COM LITERAIS

- Utiliza-se o método literal do Sequelize para realizar os agrupamentos
- ATTRIBUTES:
  - Define quais colunas você quer selecionar na consulta (SELECT).
    - attributes: ['curso_id']
- GROUP:
  - group define o agrupamento dos resultados no SQL, ou seja, ele diz por qual campo os registros serão agrupados para aplicar funções de agregação (COUNT, SUM, AVG, etc.).
- HAVING:
  - É uma cláusula SQL usada depois de um GROUP BY para filtrar grupos agregados.
  - É diferente de WHERE:
    - WHERE → filtra antes da agregação
    - HAVING → filtra depois da agregação
  - Exemplo: group: ['curso_id']

```
  async pegaCursosLotados (req, res) {
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.pegaEContaRegistros(
        {
          where: {
            status: 'matriculado'
          },
          attributes: ['curso_id'],
          group: ['curso_id'],
          having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
        });
      return res.status(200).json(cursosLotados);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
```


## TRANSAÇÕES

- Uma transação é uma alteração monitorada que fazemos num banco e que também envolve os métodos e o que o sistema faz quando parte dessas operações dão errado. Ele gerencia os casos de erro, como, por exemplo, em uma operação com 50 linhas de uma tabela onde houver um problema na 49ª. Todo esse gerenciamento é chamado de transação.
- 
- Se consultarmos a documentação do Sequelize, veremos que ele possui dois tipos de transação:

  - Transações não gerenciadas (Unmanaged transactions), onde temos que inserir manualmente as ações a serem feitas caso dê certo ou errado
  - Transações gerenciadas (Managed transactions), onde delegamos para o Sequelize o que fazer se caso houver êxito ou falha.


### TRANSAÇÕES NÃO GERENCIADAS

- Commit e Rolback são gerenciados pelo próprio usuário
```
  const transacao = await sequelize.transaction();

  try {
    const personagem = await Personagem.create({
      nome: 'Bart',
      sobrenome: 'Simpson'
    }, { transaction: transacao });
    await personagem.addParente({
      nome: 'Lisa',
      sobrenome: 'Simpson'
    }, { transaction: transacao });
    await transacao.commit();
  } catch (error) {
    await transacao.rollback();
  }
```

### Transações Gerenciadas pelo sequelize

- O próprio sequelize se encarrega de executar
```
    const dataSource = require('../database/models');

    class PessoaServices extends Services {

    // Código omitido

        async cancelaPessoaEMatriculas (estudanteId) {
            return dataSource.sequelize.transaction(async (transacao) => {
                await super.atualizaRegistro({ ativo: false }, { id: estudanteId }, transacao);
                await this.matriculaServices.atualizaRegistro({ status: 'cancelado' }, { estudante_id: estudanteId }, transacao);
            };
        }
    }


    class Services {

    // Código omitido

    async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
        const listadeRegistrosAtualizados = await dataSource[this.model]
            .update(dadosAtualizados, { 
              where: { ...where }
              transaction: transacao
            });
        if (listadeRegistrosAtualizados[0] === 0) {
          return false;
        }
        return true;
      }
        
        // Código omitido
    }


```


## LINKS DA AULA

- Documentação do Sequelize:
  - Lista dos operadores; (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)
  - Método findAndCountAll; (https://sequelize.org/api/v6/class/src/model.js~model#static-method-findAndCountAll)
  - Referência da API do Sequelize com todas as propriedades do objeto options; (https://sequelize.org/api/v6/class/src/model.js~model#static-method-findAll)
  - Exemplos da documentação sobre agrupamento; (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#grouping)
  - Método built in do Sequelize para contagem count. (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#count)
- Documentações do SQL
  - Lista de operadores genéricos do SQL; (https://www.w3schools.com/sql/sql_operators.asp)
  - Documentação sobre operadores do SQLite. (https://www.sqlite.org/lang_expr.html)
  - Documentação do update do sequelize: https://sequelize.org/api/v6/class/src/model.js~model#static-method-update
  - Documentação para transação do sequelize: https://sequelize.org/docs/v6/other-topics/transactions/




