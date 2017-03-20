/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Sprite Label component for A-Frame.
 */
AFRAME.registerComponent('sprite-label', {
  
  schema: {
    text: {type: 'string', default: ''},
    fontFace: {type: 'string', default: 'Arial'},
    fontSize: {type: 'number', default: 18},
    textColor: {type: 'string', default: 'black'}
  },

  multiple: true,

  
  init: function () {
    
    this.sprite = this.makeTextSprite( this.data.text , { fontsize: this.data.fontSize, textColor: this.data.textColor, fontFace: this.data.fontFace } );
    this.el.setObject3D('mesh', this.sprite);

  },

  
  update: function (oldData) { 

  },

  
  remove: function () { 

  },

  makeTextSprite: function ( message, parameters ) {
    var fontFace = parameters["fontFace"];
    var fontsize = parameters["fontsize"];
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r:255, g:0, b:0, a:1.0 };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontFace;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;

    context.fillStyle = textColor;
    context.fillText( message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
    var sprite = new THREE.Sprite( spriteMaterial );
    // 
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
    sprite.position.set(0,0,1);
    
    return sprite;  
  }
  
});