"use server"

export async function saveMarkdown(markdown: string, page: string, pat: string) {
    const res = await fetch(
        `https://gitlab.igem.org/api/v4/projects/3027/repository/commits`,
        {
          method: 'POST',
          headers: {
            "PRIVATE-TOKEN": pat,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "branch": "main",
            "commit_message": "updated " + page,
            "actions": [    
                {
                    "action": "update",
                    "file_path": "src/pages/" + page + ".mdx",
                    "content": markdown
                  },
                ]
          })
        },
      )

    console.log("response", res.status, res.statusText)
    return res.status == 201 ? "sucess" : "error status " + res.status + ": " + res.statusText

}