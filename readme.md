### usage:  

    $node npm-builder [package-filter...] --task [tasknames...] {--taskName} [package-filter?+deps] --build-self --root [cwd] 


### it:
searchs --root for packages dir and call npm 'whatever' you sent on --taskName, optionally run on 'local' dependencies the 'task' before its run on 'the-package'

## parameters:

#### package-filter:
optional.  
can be any or many package names under /packages relatve to 'root'.  
space separated.  
defaults to  all/any package  
it must be before any flags/switches  

#### task: 
required.
order sentitive.
task names should be one or many space separated npm/script names/keys.
It should exists on package/subpackage/package.json#scripts as it will be run as 

    'npm run whatever'

no defaults

### root:
optional  
sets cwd to start walking the packages,  
defaults to 'cwd()'.

### taskName: 
optional 
filter specifiied task name on provided packages
if '+deps' is provided will call task on dependecies prior to the actual package
task must be declared with --task
ex:
    
     packageA packageB --task clean build  --clean  packageB --build packageA +deps

will run clean only on packageB  
will run build only on packageA after run on its 'local' depedencies

#### build-self:
optional 
trys to call tsc -p . on __dirName to build /src to /built



*now that is kind'0'working I'll probably use something like lerna :)*




