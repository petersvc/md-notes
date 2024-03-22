dc := docker compose
de := docker exec -it notes

up:
	$(dc) up
upd:
	$(dc) up -d
down:
	$(dc) down
start:
	docker start notes
stop:
	docker stop notes
remove:
	make down && docker rmi "$(basename $(pwd)-nodejs)"
create-next-app:
	make set-env && make upd && $(de) sh next-app.sh && make down
create-angular-app:
	make set-env && make upd && $(de) sh angular-app.sh && make down
set-env:
	echo "APP_NAME=$(app)\nDOCKER_IMAGE=node:21.6.2" > .env
exec:
	$(de) bash
attach:
	docker attach notes
