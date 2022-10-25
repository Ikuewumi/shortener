#! /usr/bin/bash

pnpm i --offline && cd client && pnpm run build && cd ../server && pnpm run build