Control-link mapping
============================================

## Little modifies
| Original            | Web                           |
| ------------------- | ----------------------------- |
| size                | Native javascript length prop | 
| font                | CSS font-family               |
| gpx:pageframe       | Merge to Pageframe            |
| gpx:cgbject         | Merge to gpx:object           |
| gpx:sg              | Merge to gpx:object           |

## Need helps
| Tag                 | Description                   |
| ------------------- | ----------------------------  |
| gpx:document        | XML document                  |
| gpx:pageframe       | Frame of HMI                  |
| gpx:object          | Root element: size, name      |
| gpx:cgbject         | Style of font, color, etc.    |
| gpx:sg              | ?                             |
| Array               | The property is an array      |
| Pageframe           | Different from gpx:pageframe? |
| drawing-OP          | ?                             |

| control-link        | Member                        |
| ------------------- | ----------------------------  |
| userinput-discrete  | font, original                |
| userinput-analog    | font, original                |
| userinput-string    | font, original                |
| value-analog        | font, original, iopoint1      |
| PB-discrete         | keypad, accelarator           |
| any                 | value, range, offset          |
| any                 | iopoint1, iopoint2, iopoint3  |

| Button action       | Mapping from                  |
| ------------------- | ----------------------------  |
| direct              | ?                             |
| reverse             | ?                             |
| toggle              | ?                             |
| set                 | ?                             |
| reset               | ?                             |

direct, reverse, toggle, reset, set

## Mapping to JSON

gxml:
```
<gpx:document>
    <style-sheet></style-sheet>
    <DLLVersion></DLLVersion>
    <application-script></application-script>
    <gpx:object>

        <gpx:object>
            <gpx:cgbject></gpx:cgbject>
            <font></font>
        </gpx:object>

        <gpx:object>
            <gpx:sg>
                <gpx:cgbject></gpx:cgbject>
                <font></font>
                <control-link></control-link>
            </gpx:sg>
        </gpx:object>

        ...
        ..
        .

    </gpx:object>
</gpx:document>
```

JSON:
```
{
    "style-sheet": [],
    "DLLVersion": [],
    "application-script": "",
    "gpx:object":{
        "gpx:sg": {},
        "gpx:cgbject":{},
        "font": {},
        "control-link": {}
    },
    "gpx:object":{
        "gpx:sg": {},
        "gpx:cgbject":{},
        "font": {},
        "control-link": {}
    }
    ...
    ..
    .
}
```