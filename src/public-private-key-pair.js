import { generateKeyPair} from '@libp2p/crypto/keys'
import { peerIdFromKeys, peerIdFromString } from '@libp2p/peer-id'
import { getPeerID } from './libp2p.js';


/**
 * This function returns the public key of a node
 * @param {Libp2p} node 
 * @returns {Uint8Array} - the public key represented as an array of 8-bit unsigned integers
 */
export function getPublicKeyFromNode(node) {
    const peerId = getPeerID(node);
    try {
      if(peerId.publicKey) {
        const publicKey = peerId.publicKey;
        // console.log("Public Key:", publicKey.toString('base64'));
        return publicKey;
      } else {
        console.log("Public key is not embedded in this Peer ID.");
      }

    } catch(error) {
      console.error("Error retrieving public key:", error);
    }
}
// console.log("Public Key from test node:", getPublicKeyFromNode(test_node));

/**
 * This function returns the public key of a node
 * @param {Libp2p} node 
 * @returns {Uint8Array} the private key represented as an array of 8-bit unsigned integers
 */

export function getPrivateKeyFromNode(node) {
    const peerId = getPeerID(node);
    try {
        if(peerId.privateKey) {
            const privateKey = peerId.privateKey;
            // console.log("Private Key:", privateKey.toString('base64'));
            return privateKey;
        } else {
            console.log("Private key is not embedded in this Peer ID.");
        }
    } catch(error) {
        console.error("Error retrieving private key:", error);
    }
}

/**
 * This function creates a public/private key pair and prints the keys as well as their representation in string and hex format
 * @returns {void}
 */
export async function printKeyPair() {
    try {
        const keyPair = await generateKeyPair('ed25519');
        const {_key: privateKey, _publicKey: publicKey} = keyPair
        const privateKeyString = privateKey.toString('base64'); 
        const publicKeyString = publicKey.toString('base64');   
        const publicKeyHex = publicKey.toString('hex');
        const privateKeyHex = privateKey.toString('hex');


        console.log('Public Key:', publicKey);
        console.log('Private Key:', privateKey);
        console.log("Public Key String Format:", publicKeyString);
        console.log("Private Key String Format:", privateKeyString);
        console.log("Public Key Hex Format:", privateKeyHex);
        console.log("Private Key Hex Format:", privateKeyHex);

    } catch (error) {
        console.error('Error generating key pair:', error);
    }
}

/**
 * This function verifies whether the public key belongs to a node
 * @param {Libp2p} node 
 * @param {Uint8Array} publicKey - the public key associated with the libp2p node
 * @returns {boolean} True if the key belongs to the node, otherwise false
 */

export async function verifyNode(peerId, publicKey) {
    const peerIdKey = await peerIdFromKeys(publicKey)

    console.log("Peer ID: ", peerId);
    console.log("Peer ID from Key:", peerIdKey);
    
    const peerIdString = peerId.toString();
    const peerIdKeyString = peerIdKey.toString();

    console.log("Peer ID String from node:", peerIdString);
    console.log("Peer ID String from Key:", peerIdKeyString);
    // Compare the string representations
    if (peerIdString === peerIdKeyString) {
        return true
    } else {
        return false
    }
}