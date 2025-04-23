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
