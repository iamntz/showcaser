### What's this?
A simple utility to showcase your site (useful if you want to show off your masterpiece in markets like Envato). You can see a demo [here](http://ionutstaicu.com/projects/ShowCaser/)

### What about Switcheroo?
[Switcheroo](https://github.com/OriginalEXE/Switcheroo) is awesome! In fact, Switcheroo served as a main inspiration, therefore Switcheroo configuration file (`projects.js`) can be used directly on ShowCaser

So if Switcheroo is so awesome, why ShowCaser? Considering that pages that are going to be displayed via ShowCaser are already big (1.5Mb is the super best case scenario), we want to have the whole set up done ASAP. I ditched bootstrap (both CSS ans JS), carousel scripts and everything that was not super important (by keeping the same aspect). Long story short, we have the whole code in about 50kb (jQuery and fonts included). Depending on how ShowCaser is received, I'll probably ditch also jQuery to make things even faster!

Besides size improvements, I also added a sub-page selector (in case you want to show more pages within the same project), ability to add multiple tags for a project and an URL updater (that works on modern browser only).


### How to use?

As I mentioned above, you can simply use Switcheroo config file. The difference is that you can name the object whatever you want:

```
var projects = [
  {
    name     : 'Project Name',
    tag      : [],  // optional; if you have only one tag, you can simply use a string instead
    img      : '', // the thumb URL to be displayed in the preview
    url      : '', // the URL that needs to be loaded in the frame
    purchase : '', // optional
    tooltip  : '', // optional
    subpages : [ // optional
      {
        name : "", // the name that will be displayed in the drop down
        url  : "" // the URL that will be loaded in the frame
      }
    ],
    responsive: 0 // optional; if set to zero, size buttons won't be displayed
  },
];
```

The default configuration assumes that you have named the `projects` objects available and is auto-instantiated:

```
new ProjectManager( projects );
```

Obviously enough, you can use whatever name you would like or even pass the object directly! (although not recommended since will make the code harder to manage)

### Can I add other screen sizes?
Yes!

    <a href="#" data-size="768" title="Medium Screen (tablet)"><i class="icon-tablet"></i></a></li>

You notice the `data-size` attribute? You can simply adjust to whatever you want.

### How about (more) icons?
I used Material Design Icons by Google. If you are looking inside of `assets/icon` folder, you will see a file called `selection.json`. Load that bad boy into [Icomoon](https://icomoon.io/app/) App and you can add as many icons as you need!

### How about mobile? Tablets?
Although I quickly tested on an iPad (iOS 8), I have no guarantee that will behave nicely. But it should. Anyhow, buttons are hidden on resolutions smaller than 900px.

### To Do

- add URL for sub projects
- ditch jQuery completely
- add unit tests
- improve CSS
- disable buttons on smaller screens


### License
ShowCaser is released under MIT license.

### Contributing
Any Pull Request is welcome!