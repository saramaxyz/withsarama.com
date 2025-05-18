from http.server import HTTPServer, SimpleHTTPRequestHandler

class PNGHandler(SimpleHTTPRequestHandler):
    # Copy the default extension map and add/override entries you need
    extensions_map = SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        ".png": "image/png",   # <-- your requested addition
        # add other tweaks here if you like, e.g. ".svg": "image/svg+xml"
    })

if __name__ == "__main__":
    HTTPServer(("", 8000), PNGHandler).serve_forever()
