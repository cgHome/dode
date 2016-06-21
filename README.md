## dode

Docker Development -  toolkit

## Note

Please note this is a alpha version, any feedback is more than welcome!

## Prerequisites
```
docker
node.js
```

## Installation
```bash
npm install -g dode
```

## Starter Guide
### Step-1
Clone an existing dode-project  

-or-

Build a project from the base

```bash
# Create a directory for your project/app
$ mkdir <project>
$ cd <project>
# Create package.json
$ npm init
... follow instructions
# Create dode-project with web/srv/db - services
$ dode-compose init
```
### Step-2
- customise <project>/package.json (name/version) 
- customise <project>/dode.json (docker)

## Usage
```bash
# docker wrapper script
$ dode --help

# docker-compose wrapper script
$ dode-compose --help
```

## ToDo:
- add test environment
- add Continuous Delivery (CD) 
- (git) submodule handling
- push images to registry/hub
- improve my english writing ... :smile:

## Known issues
- dode-compose dev ps -> Error: stty: stdin isn't a terminal

## Thanks to
- tutum > [Docker, AngularJS and Tutum](https://blog.tutum.co/2015/06/03/docker-angularjs-and-tutum-part-1/)
- Amine Mouafik > [Efficient development workflow using Git submodules and Docker Compose](https://www.airpair.com/docker/posts/efficiant-development-workfow-using-git-submodules-and-docker-compose)
- Ryan Ramage > [docker-build-run-push](https://github.com/ryanramage/docker-build-run-push.git)

## License
MIT