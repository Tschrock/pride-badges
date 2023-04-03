# Pride Badges

Customizable pride badges for your projects.

![Trans Rights][badge-trans]
![LGBTQ+ Friendly][badge-lgbtq]
![Sponsored by the Gay Agenda][sponsored]
![Dependencies](https://img.shields.io/librariesio/github/tschrock/pride-badges)
![GitHub](https://img.shields.io/github/license/tschrock/pride-badges)

https://pride-badges.pony.workers.dev/


## API

### GET `/static/v1`
#### Parameters
<dl>
    <dt><code>label</code></dt>
    <dd>The badge label. Required.</dd>
    <dt><code>labelColor</code></dt>
    <dd>The background color for the badge label. Default is <code>#555</code>.</dd>
    <dt><code>stripeWidth</code></dt>
    <dd>The width of the stripes. Default is <code>8</code>.</dd>
    <dt><code>stripeColors</code></dt>
    <dd>A comma seperated list of stripe colors. Required.</dd>
</dl>

#### Examples


![LGBTQ+ Friendly][badge-lgbtq]

```
https://pride-badges.pony.workers.dev/static/v1?label=lgbtq%2B%20friendly&amp;stripeWidth=6&amp;stripeColors=E40303,FF8C00,FFED00,008026,24408E,732982
```

![Trans Rights][badge-trans]
```
https://pride-badges.pony.workers.dev/static/v1?label=trans%20rights&amp;stripeWidth=6&amp;stripeColors=5BCEFA,F5A9B8,FFFFFF,F5A9B8,5BCEFA
```



## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

----

<p>Made with <img height="18" src="https://emoji.lgbt/assets/svg/bi-heart.svg"/> by <a href="https://twitter.com/CyberPon3">@CyberPon3</a><br>Like pride tech? Check out <a href="https://emoji.lgbt">https://emoji.lgbt</a></p>

[badge-trans]: https://pride-badges.pony.workers.dev/static/v1?label=trans%20rights&stripeWidth=6&stripeColors=5BCEFA,F5A9B8,FFFFFF,F5A9B8,5BCEFA
[badge-lgbtq]: https://pride-badges.pony.workers.dev/static/v1?label=lgbtq%2B%20friendly&stripeWidth=6&stripeColors=E40303,FF8C00,FFED00,008026,24408E,732982
[sponsored]: https://pride-badges.pony.workers.dev/static/v1?label=sponsored+by+the+gay+agenda&labelColor=%23555&stripeWidth=6&stripeColors=E40303%2CFF8C00%2CFFED00%2C008026%2C24408E%2C732982
