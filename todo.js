const input = document.getElementById("Task");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");

function createListItem(taskObj) {
  const li = document.createElement("li");
  li.innerText = taskObj.task;
  li.setAttribute("id", taskObj.id);

  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";
  delbtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(delbtn);
  ul.appendChild(li);
}

btn.addEventListener("click", () => {
  const trimmed = input.value.trim();
  if (trimmed) {
    fetch("/task", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ task: trimmed }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.mess === "ok") {
          createListItem({ task: trimmed, id: data.id });
          input.value = "";
        } else {
          alert("server issues");
        }
      })
      .catch((e) => console.log(e));
  } else {
    alert("input can't be empty");
  }
});

fetch("/getAll")
  .then((res) => res.json())
  .then((tasks) => {
    tasks.forEach((taskObj) => {
      createListItem(taskObj);
    });
  })
  .catch((e) => console.log(e));
