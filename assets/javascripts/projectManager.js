function ProjectManager( projects ) {
  var $this = this;

  this.projects = projects;
  this.container = $('.projects ul');
  this.currentProject = $('.currentProject');
  this.projectSelectorActiveClass = 'projects-isActive';
  this.projectSubpages = $('.currentProjectSubpages');

  this.injectProjects();

  this.currentProject.on('click', function(){
    $('html').toggleClass( $this.projectSelectorActiveClass );
  });

  this.container.on('click faux-click', 'a', $.proxy( this.switchProject, this ) );
  this.projectSubpages.on('change faux-change', $.proxy( this.switchSubProject, this ) );

  var $this = this;

  this.activateProjectFromUrl();
}


ProjectManager.prototype = {
  getProjectTemplate: function( project ){
    var tpl = $( '<li class="project"><a><img></a></li>' );
    $('a', tpl).attr({
      'href': project.url,
      'title': project.name
    }).data( 'project', project );
    $('img', tpl).attr('src', project.img);

    if( project.tooltip ){
      $('<span class="project__tooltip" />').text( project.tooltip ).appendTo( tpl );
    }
    return tpl;
  },

  getTagTemplate: function( tag ){
    var className = 'tag-' + tag.replace(/[^a-z]+$/ig , '' );
    className = className.replace(/\s/, '-');
    return '<span class="tag ' + className + '">' + tag + '</span>';
  },

  injectProjects: function(){
    var $this = this;

    $( this.projects ).each(function( i, project ){
      $this.container.append( $this.getProjectTemplate( project ) );
    });
  },


  switchProject: function( e ){
    e.preventDefault();

    var el = $( e.currentTarget );
    var project = el.data('project');


    var title = project.name;
    title += this.getTags( project.tag );

    this.currentProject.html( title );

    el.parent().addClass('project-isActive').siblings().removeClass('project-isActive');

    var buyButton = $('.toolbar__buy');
    if( project.purchase ){
      buyButton.removeClass('disableBuyButton').attr( 'href', project.purchase );
    } else {
      buyButton.addClass('disableBuyButton');
    }
    $('.toolbar__close').attr( 'href', project.url );
    $('title').html( project.name );
    $('html').removeClass( this.projectSelectorActiveClass );


    if( project.responsive === 0 ){
      $('body').addClass('disableResponsiveButtons');
    } else {
      $('body').removeClass('disableResponsiveButtons');
    }

    if( project.subpages ){
      this.projectSubpages.empty().addClass('projectHasSubpages');
      this.enableSubpages( project.subpages );
    } else {
      this.projectSubpages.empty().removeClass('projectHasSubpages');
    }

    this.loadIframe( project.url );
    if( e.type.search(/faux/) === -1 ){
      this.updateProjectUrl( project.name );
    }
    return false;
  },


  loadIframe: function( url ){
    $('iframe.preview').attr( 'src', url );
  },


  activate: function( activeProject ){
    if( typeof activeProject === 'number' ){
      $('a', this.container ).eq( activeProject ).trigger( 'faux-click' );
    } else {
      $('a', this.container ).filter(function( i, a ){
        return $(a).data('project').name == activeProject;
      }).trigger( 'faux-click' );
    }
  },


  getTags: function( tags ){
    var tagsMarkup = '';
    if( typeof tags === 'string' ){
      tags = [ tags ];
    }

    if ( typeof tags === 'object' ) {
      tagsMarkup += this.getMultipleTags( tags );
    }

    return tagsMarkup;
  },


  getMultipleTags: function( tags ){
    var tagsMarkup = '';
    for (var i = 0; i < tags.length; i++) {
      tagsMarkup += this.getTagTemplate( tags[i] );
    }

    return tagsMarkup;
  },


  enableSubpages: function( subpages ){
    var $this = this;

    $('<option />').attr({
      value: '',
      disabled: 'disabled'
    }).text( this.projectSubpages.data('default') ).appendTo( this.projectSubpages );

    for (var i = 0; i < subpages.length; i++) {
      $('<option/>').attr( 'value', subpages[i].url ).text( subpages[i].name ).appendTo( this.projectSubpages );
    };
    this.projectSubpages.trigger('faux-change');
  },


  switchSubProject: function( e ){
    var el = $( e.currentTarget )
    var activeEl = $('option', el).filter(':selected');

    $( '.breadcrumb', this.currentProject ).remove();

    var breadcrumb = $('<span class="breadcrumb" />').text( ' / ' + activeEl.text() );
    breadcrumb.insertBefore( $( '.tag', this.currentProject ).first() );
    this.loadIframe( activeEl.val() );

    if( e.type.search(/faux/) === -1 ){
      //  TODO: add subproject URL navigation
    }
  },


  activateProjectFromUrl: function(){
    var activeProject = 0;

    if( this.getQueryString().project ) {
      activeProject =  this.getQueryString().project;
    }

    this.activate( activeProject );
  },


  getQueryString: function( query ){
    query = query || window.location.search.substring(1);
    query = query.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while ( tokens = re.exec( query ) ) {
      params[ decodeURIComponent( tokens[1] ) ] = decodeURIComponent( tokens[2] );
    }

    return params;
  },


  updateProjectUrl: function( projectName ){
    if( typeof history.pushState === 'undefined' ){ return; }

    history.pushState(null, null, "?project=" + encodeURIComponent( projectName ) )
  },
};