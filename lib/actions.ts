"use server"

export async function saveMarkdown(markdown: string, page: string, pat: string) {
    await fetch(
        `https://gitlab.igem.org/api/v4/projects/1866/repository/commits`,
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
      ).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
        });

}