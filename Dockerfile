FROM python:3.9.17-slim-bullseye

WORKDIR /workspace

RUN apt-get update && apt-get install curl -y

RUN pip install --upgrade pip

ENV POETRY_HOME="/opt/poetry"
ENV POETRY_VERSION="1.5.0"

RUN pip install --upgrade pip

RUN curl -sSSL https://install.python-poetry.org | python3 - && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY ./pyproject.toml* ./poetry.lock* ./

RUN poetry install

CMD [ "bash", "generate_wordcloud.sh"]
