<div align='center'>

# **ConfigMaster**

</div>

<div align='center'>

### Open-Source CLI to add configurations to projects

</div>

<h4 align='center'>
    <a href="https://www.npmjs.com/package/configmaster">
        <img src="https://img.shields.io/npm/v/configmaster.svg" alt="ConfigMaster version" />
    </a>
    <a href="https://github.com/Yitzhakpro/ConfigMaster/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="ConfigMaster is released under the MIT license." />
    </a>
    <a href="https://github.com/Yitzhakpro/ConfigMaster/issues">
        <img src="https://img.shields.io/github/commit-activity/m/Yitzhakpro/ConfigMaster" alt="git commit activity" />
    </a>
</h4>

# How ConfigMaster can help you?

Have you ever started a project and forgotten to add configurations (eslint, prettier, etc...)?
</br>
Have you ever wanted to create a config-less project and later configurations (eslint, prettier, etc...)?

Well, `ConfigMaster` is the tool for you, with configmaster you can add any configuration to an existing project,
</br>
just use a simple command, answer the prompts and it will do the rest for you (including creating configuration files, ignore files and adding scripts to package.json).

### Configurations you can add:

-   [Husky](https://www.npmjs.com/package/husky)
-   [Eslint](https://www.npmjs.com/package/eslint)
-   [Prettier](https://www.npmjs.com/package/prettier)
-   [License](https://choosealicense.com/)

# Usage

**Notice: You can the --help to view all the options:** `npx configmaster --help`

### To `add` configurations:

```console
$ npx configmaster add prettier, husky, eslint
```

The available configurations are: `eslint`, `husky`, `prettier`, `license`.
**You can specify the configurations in any order!**

**For more help use:** `npx configmaster add --help`
