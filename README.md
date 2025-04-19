My Learning From This Project

🔹 In the DOM, when we access elements using methods like:
- getElementsByClassName()
- getElementsByName()
- getElementsByTagName()
- querySelectorAll()

These methods return collections (HTMLCollection or NodeList), not individual elements. To work with each element—such as adding event listeners—we need to iterate over the collection, otherwise, we might encounter a "TypeError: addEventListener is not a function".

✅ If we want to get a single, direct element, use:
- getElementById()
- querySelector()
