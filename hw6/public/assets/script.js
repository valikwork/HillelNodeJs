(async () => {
	
	const $ul = document.getElementById("list");
	const $loginForm = document.getElementById("login-form");
	let isUserLogged = false;

	fetch("/api/auth")
		.then((data) => {
			if(data.status === 401){
				console.log('401 error');
			} else {
				console.log('isUserLogged');
				isUserLogged = true
			}
		})
	
	// fetch("/api/messages")
	// 	.then((data) => data.json())
	// 	.then((data) => {
	// 		data.forEach((element) => {
	// 			const $li = document.createElement("li");
	// 			$li.innerHTML = `${element.sender}: ${element.text}`;
	// 			$ul.appendChild($li);
	// 		});
			
	// 	});

	$loginForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const login = e.target.children.login.value;
		const body = {
			"username": login
		}
		console.log(body);
		console.log(login);
		let response = await fetch("/api/auth/login", { 
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		let responseJson = await response.json();
		location.reload()
		console.log(responseJson);
	})

	

	

	async function sendRequest({url, method = 'GET', callback, ...props}) {
		try {
			let response = await fetch(url, { method, ...props });
			let responseJson = await response.json();
			callback && callback(responseJson);
		} catch (error) {
			console.log(error);
		}
	}

})()
