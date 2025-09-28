document.addEventListener('DOMContentLoaded', () => {
    const pageName = window.location.pathname.split("/").pop();

    if (pageName === 'index.html' || pageName === '') { // This is the landing page
        const buttons = document.querySelectorAll('.menu-selection button');
        const gifUrl = 'https://media.giphy.com/media/63x2s0n3k3yQ8/giphy.gif';

        buttons.forEach(button => {
            button.addEventListener('mouseover', (e) => {
                const numGifs = 20;
                const cursorX = e.clientX;
                const cursorY = e.clientY;

                for (let i = 0; i < numGifs; i++) {
                    const gif = document.createElement('img');
                    gif.src = gifUrl;
                    gif.classList.add('coin-gif');
                    document.body.appendChild(gif);

                    let x = cursorX;
                    let y = cursorY;
                    let vx = (Math.random() - 0.5) * 20;
                    let vy = -Math.random() * 20;
                    const gravity = 0.5;

                    const animate = () => {
                        vy += gravity;
                        x += vx;
                        y += vy;

                        gif.style.left = `${x}px`;
                        gif.style.top = `${y}px`;

                        if (y < window.innerHeight) {
                            requestAnimationFrame(animate);
                        } else {
                            gif.remove();
                        }
                    };
                    requestAnimationFrame(animate);
                }
            });
        });
    } else if (pageName === 'home.html') { // This is the SPA page
        const contentDiv = document.createElement('div');
        contentDiv.id = 'content';
        document.body.appendChild(contentDiv);

        const routes = {
            '1': '<h1>메뉴 1</h1><p>메뉴 1의 내용입니다.</p>',
            '2': '<h1>메뉴 2</h1><p>메뉴 2의 내용입니다.</p>',
            '3': '<h1>메뉴 3</h1><p>메뉴 3의 내용입니다.</p>',
        };

        const navigate = (menu) => {
            const content = routes[menu] || '<h1>페이지를 찾을 수 없습니다.</h1>';
            contentDiv.innerHTML = content;

            document.querySelectorAll('.navbar a').forEach(a => {
                if (a.getAttribute('href') === `home.html?menu=${menu}`) {
                    a.classList.add('active');
                } else {
                    a.classList.remove('active');
                }
            });
        };

        const handleNavigation = (e) => {
            const link = e.currentTarget;
            if (link.getAttribute('href') === 'index.html') {
                return; // Allow normal navigation to index.html
            }

            e.preventDefault();
            const url = new URL(link.href);
            const menu = url.searchParams.get('menu');
            history.pushState({ menu }, '', `home.html?menu=${menu}`);
            navigate(menu);
        };

        document.querySelectorAll('.navbar a').forEach(a => {
            a.addEventListener('click', handleNavigation);
        });

        window.addEventListener('popstate', (e) => {
            const menu = e.state ? e.state.menu : new URLSearchParams(window.location.search).get('menu');
            if (menu) {
                navigate(menu);
            }
        });

        const initialMenu = new URLSearchParams(window.location.search).get('menu');
        if (initialMenu) {
            navigate(initialMenu);
        }
    }
});
