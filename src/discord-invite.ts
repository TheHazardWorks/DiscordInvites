/**
BSD 3-Clause License

Copyright (c) 2019, YourNetworkNerd (https://twitter.com/YourNetworkNerd)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
interface Response {
    [index: string]: any;
}

class InviteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InviteError';
    }
}

function parseDiscordInvite(link: string) {
    return new Promise((resolve: Function, reject: Function) => {
        let code: string = (link.startsWith('https:')) ? link.replace('https://discord.gg/','') : link;

        let xmlHttp: XMLHttpRequest = new XMLHttpRequest();
        xmlHttp.open('GET', `https://discordapp.com/api/v7/invites/${code}?with_counts=true`);
        xmlHttp.send();

        xmlHttp.onload = function() {
            if(xmlHttp.status !== 200) {
                throw new InviteError(`Could not get invite: Status - ${xmlHttp.status}`);
            } else {
                let i = JSON.parse(xmlHttp.responseText);
                let icon = function(): string {
                    return `https://cdn.discordapp.com/icons/${i.guild.id}/${i.guild.icon}.webp?size=2048`;
                }
                let invite = {
                    code: i.code,
                    invite: `https://discord.gg/${i.code}`,
                    guild: {
                        id: i.guild.id,
                        name: i.guild.name,
                        description: i.guild.description,
                        verification: i.guild.verification_level,
                        icon: i.guild.icon,
                        iconURL: icon(),
                        features: i.guild.features,
                        splash: i.guild.splash,
                        banner: i.guild.banner,
                        vanityURL: i.guild.vanity_url_code,
                        online: i.approximate_presence_count,
                        total: i.approximate_member_count
                    },
                    channel: {
                        id: i.channel.id,
                        type: i.channel.type,
                        name: i.channel.name,
                    }
                }
                resolve(invite);
            }
        }
    })
}