#! /usr/bin/bash

pnpm i && cd client && pnpm run build && cd ../server && pnpm run build