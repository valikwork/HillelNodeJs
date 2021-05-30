(async () => {
	
	const $loginForm = document.getElementById("login-form");
	const $logoutBtn = document.getElementById("logout");
	const $addMessageForm = document.getElementById("add-message");

	fetch("/api/auth")
		.then((data) => {
			if(data.status === 401){
				console.log('401 error: User Not Logged In');
			} else {
				console.log('User Logged In');
			}
		})

	$loginForm && $loginForm.addEventListener('submit', async (e) => {
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
	})

	$logoutBtn && $logoutBtn.addEventListener('click', async () => {
		let response = await fetch("/api/auth/logout")
		let responseJson = await response.json();
		console.log(responseJson);
		location.reload()
	})

	$addMessageForm && $addMessageForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const text = e.target.children.text.value;
		const body = {
			"text": text
		}
		let response = await fetch("/api/messages", { 
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		let responseJson = await response.json();
		location.reload()
	})


})()
