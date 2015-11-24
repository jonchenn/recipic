# recipic

Recipic - an Instagram-like recipe sharing app. This is designed for [Dosudo](https://www.facebook.com/groups/dosudo/) live coding demo.

## Setup

### Parse

Create a new table called "Recipe" with following columns:

* title (string)
* content (string)
* image (file)
* user (pointer to User table)

Then copy your Parse App ID and JS Key into app.js

### Ionic

* Install Ionic CLI
```
npm install -g ionic
ionic lib update
```

### Get codes
* Clone this repository

```
git clone https://github.com/jonchenn/recipic.git
```

### Install libraries/packages

```
bower install
```

## Run in browser
In the project folder, run:

```
ionic serve
```

## Run in device

* Run in iOS
```
ionic run --device ios
```

* Run in Android
```
ionic run --device android
```
