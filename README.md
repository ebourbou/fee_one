nothing to see yet



## Issues
1. Ein Klick auf den Schatten des Edit-Buttons (innerhalb eines Items) ist offensichtlich ausserhalb der Items

```javascript
    document.getElementById("items").addEventListener("click", (event) => {
             const itemId = event.target.closest(".item").dataset.id;
             console.log(itemId)
         }
    )
```
`
Uncaught TypeError: Cannot read property 'dataset' of null
    at HTMLDivElement.<anonymous> (main.js:30)
`
