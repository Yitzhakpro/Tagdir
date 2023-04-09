<div align='center'>

# **Confinger**

</div>

<div align='center'>

### Open-Source CLI to add configurations to projects

</div>

<h4 align='center'>
    <a href="https://www.npmjs.com/package/confinger">
        <img src="https://img.shields.io/npm/v/confinger.svg" alt="Confinger version" />
    </a>
    <a href="https://github.com/Yitzhakpro/Confinger/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Confinger is released under the MIT license." />
    </a>
    <a href="https://github.com/Yitzhakpro/Confinger/issues">
        <img src="https://img.shields.io/github/commit-activity/m/Yitzhakpro/Confinger" alt="git commit activity" />
    </a>
</h4>

# How Confinger can help you?

Have you ever started a project and forgotten to add configurations (eslint, prettier, etc...)?
</br>
Have you ever wanted to create a config-less project and later configurations (eslint, prettier, etc...)?

Well, `Confinger` is the tool for you, with configmaster you can add any configuration to an existing project,
</br>
just use a simple command, answer the prompts and it will do the rest for you (including creating configuration files, ignore files and adding scripts to package.json).

### Configurations you can add:

-   [Husky](https://www.npmjs.com/package/husky)
-   [Eslint](https://www.npmjs.com/package/eslint)
-   [Prettier](https://www.npmjs.com/package/prettier)
-   [License](https://choosealicense.com/)

# Usage

**Notice: You can the --help to view all the options:** `npx confinger --help`

### To `add` configurations:

```console
$ npx confinger add prettier, husky, eslint
```

The available configurations are: `eslint`, `husky`, `prettier`, `license`.
**You can specify the configurations in any order!**

**For more help use:** `npx confinger add --help`
