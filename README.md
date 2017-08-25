#acc-retro-tor-chat

Anonymous Communications Console (ACC) - anonymous Tor chat with retro styles using:
- [node.js](https://nodejs.org/)
- [express](http://expressjs.com/)
- [websockets](https://github.com/websockets/ws)

### Running Locally on Ubuntu 16:
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
git clone https://github.com/princeamaimon/acc-retro-tor-chat.git
cd acc-retro-tor-chat
sed -i  's|//var host = "www.xxx.yyy.zzz";|var host = "<your.ip.address.here>";|' index.html
npm install
nodejs ./index.js
```
your anonymous communications console running on [http://www.xxx.yyy.zzz:2600](http://www.xxx.yyy.zzz:2600/).

### Running via Tor on Ubuntu 16:
```
sudo apt-get install tor
sudo mkdir /var/lib/tor/acc-retro-tor-chat
sudo chown debian-tor:debian-tor /var/lib/tor/acc-retro-tor-chat
sudo chmod 700 /var/lib/tor/acc-retro-tor-chat
echo "HiddenServiceDir /var/lib/tor/acc-retro-tor-chat" | sudo tee -a /etc/tor/torrc
echo "HiddenServicePort 2600 127.0.0.1:2600" | sudo tee -a /etc/tor/torrc
echo "HiddenServicePort 8081 127.0.0.1:8081" | sudo tee -a /etc/tor/torrc
sudo service tor restart
hostname=`sudo cat /var/lib/tor/acc-retro-tor-chat/hostname`
sed -i  "s|//var host = \"\[hostname\].onion\";|var host = \"${hostname}\";|" index.html
nodejs ./index.js
```
your anonymous communications console running on [hostname.onion:2600](http://hostname.onion:2600/).

## Documentation

- [Configuring Hidden Services for Tor](https://www.torproject.org/docs/tor-hidden-service.html.en)
- [Tor Hidden (Onion) Services Best Practices](https://riseup.net/en/security/network-security/tor/onionservices-best-practices)
- ...
