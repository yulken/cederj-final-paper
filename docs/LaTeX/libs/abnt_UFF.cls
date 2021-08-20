%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                                                                  %
%                            PREAMBLE                              %
%                                                                  %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%        IDENTIFICATION        %%%%%%%%%%%%

\NeedsTeXFormat{LaTeX2e}%
\input{./LaTeX/libs/cvs-id.def}
\CVSExtract$Id: abnt_UFF.cls,v 1.27.2.1 2004/11/02 15:04:29 gweber Exp $
\CVSClass{abnt_UFF}{\space Classe abnt_UFF (NBR6024, NBR6027, NBR6028, NBR14724)} %substitui \ProvidesPackage (replaces \ProvidesPackage)

% \NeedsTeXFormat{LaTeX2e}%
% \ProvidesClass{abnt}%
%  [2002/05/20 version 1 da Classe LaTeX2e ABNT]

%%%%%%   Required packages for the implementation of this class  %%%%%%

% ifthen - conditions in LaTeX
\RequirePackage{ifthen}

% calc - standard package for length and number easy calculations
\RequirePackage{calc}

% multicol - better multicolunms
\RequirePackage{multicol}


%%%%%%%%%%%%%      OPTION DECLARATION      %%%%%%%%%%%%

%% Page numbering squeme
\providecommand{\ABNTpnum}{}
\DeclareOption{pnumabnt}       {\renewcommand{\ABNTpnum}{ABNT}}
\DeclareOption{pnumplain}      {\renewcommand{\ABNTpnum}{plain}}
\DeclareOption{pnumromarab} {\renewcommand{\ABNTpnum}{RomSumArab}}
\ExecuteOptions{pnumabnt}


%% Automatically include in TOC bibliography, index and stared chapters
\newboolean{ABNTincludeintoc}
\DeclareOption{sumariocompleto}   {\setboolean{ABNTincludeintoc}{true}}
\DeclareOption{sumarioincompleto} {\setboolean{ABNTincludeintoc}{false}}
\ExecuteOptions{sumariocompleto}

%% Style of page numbers in TOC
\newboolean{ABNTpagenumstyle}
\DeclareOption{abnttoc}   {\setboolean{ABNTpagenumstyle}{false}}
\DeclareOption{normaltoc} {\setboolean{ABNTpagenumstyle}{false}}
\ExecuteOptions{abnttoc}

%% Figures and tables independent of sections?

\newboolean{ABNTfigtabnumbers}
\DeclareOption{abntfigtabnum}{\setboolean{ABNTfigtabnumbers}{false}}
\DeclareOption{normalfigtabnum}{\setboolean{ABNTfigtabnumbers}{false}}
\ExecuteOptions{abntfigtabnum}

%% Option: page headers
\newboolean{ABNTheader}
\providecommand{\ABNTheadertype}{\relax}
\DeclareOption{noheader}    {\setboolean{ABNTheader}{false}}
\DeclareOption{header}      {\setboolean{ABNTheader}{true}
                             \renewcommand{\ABNTheadertype}{normal}}
\DeclareOption{plainheader} {\setboolean{ABNTheader}{true}
                             \renewcommand{\ABNTheadertype}{plain}}
\DeclareOption{ruledheader} {\setboolean{ABNTheader}{true}
                             \renewcommand{\ABNTheadertype}{ruled}}
\ExecuteOptions{plainheader}

%% Option `capchap', `capsec': 
%%   titles of chapters or sections in capital letters 
\newboolean{ABNTcapchap}
\setboolean{ABNTcapchap}{false}
\newboolean{ABNTcapsec}
\setboolean{ABNTcapsec}{false}

\DeclareOption{capchap}{\setboolean{ABNTcapchap}{true}
                        \setboolean{ABNTCapAnnexAppendix}{true}}
\DeclareOption{capsec}{\setboolean{ABNTcapsec}{true}}

%% Option `anapmaiusc' and `anapnormal'
%%   should \annexname and \appendixname be on capital letters?

\newboolean{ABNTCapAnnexAppendix}
\setboolean{ABNTCapAnnexAppendix}{true}  % manual execution of option for
                                         % cooperation between `capchap'
                                         % and `anexapendnormal'

\DeclareOption{anapmaiusc}{\setboolean{ABNTCapAnnexAppendix}{true}}
\DeclareOption{anapnormal}{\setboolean{ABNTCapAnnexAppendix}{false}}

%% Option `anapindentindic' in order to \anexo or \apendice make ABNT
%% strict indentation on its titles.

\newboolean{ABNTAnApIndicativoIndent}

\DeclareOption{anapindicindent}{\setboolean{ABNTAnApIndicativoIndent}{true}}
\DeclareOption{anapcustomindent}{\setboolean{ABNTAnApIndicativoIndent}{false}}

\ExecuteOptions{anapindicindent}

%% Option `anapindentindic' in order to \anexo or \apendice make ABNT
%% strict indentation on its titles.

\newboolean{ABNTAnApName}
\DeclareOption{anapname}{\setboolean{ABNTAnApName}{true}}
\DeclareOption{anapnoname}{\setboolean{ABNTAnApName}{false}}

\ExecuteOptions{anapname}

%% Line Spacing options: change current setting.
\newcommand*{\ABNTespacodefault}{} %
\DeclareOption{espacoumemeio} {\renewcommand*{\ABNTespacodefault}%
                                  {\taxaespacoumemeio}} % default
\DeclareOption{espacosimples} {\renewcommand*{\ABNTespacodefault}%
                                  {\taxaespacosimples}}
\DeclareOption{espacoduplo}   {\renewcommand*{\ABNTespacodefault}%
                                  {\taxaespacoduplo}}
\ExecuteOptions{espacoumemeio}
%bruno espao duplo
%\ExecuteOptions{espacoduplo}

%% Margin care --> Removed since version 1 beta

%% Options `spacednotes': removed since version 0.3
%  Assuming notes single spaced always (no alternative if using setspace ;-D

%% Option: loading common packages NO LONGER SUPPORTED!!!
\newboolean{ABNTcommonpack}
\DeclareOption{paccomuns}    {\setboolean{ABNTcommonpack}{true}}
\DeclareOption{sempaccomuns} {\setboolean{ABNTcommonpack}{false}}
\ExecuteOptions{sempaccomuns}

%% Auto bold math: bold math version ir text font is in bold face
\newboolean{ABNTautobm}
\DeclareOption{autobm}   {\setboolean{ABNTautobm}{true}}
\DeclareOption{noautobm} {\setboolean{ABNTautobm}{false}}
\ExecuteOptions{autobm}

%% font option: helvetica as default or not
\newboolean{ABNThelveticafont}
\DeclareOption{helvetica}   {\setboolean{ABNThelveticafont}{true}}
\DeclareOption{nohelvetica} {\setboolean{ABNThelveticafont}{false}}
\ExecuteOptions{nohelvetica}

%% Option to indent the first paragraph of each section or chapter
\newboolean{ABNTindentfirst}
\DeclareOption{indentfirst}   {\setboolean{ABNTindentfirst}{false}}
\DeclareOption{noindentfirst} {\setboolean{ABNTindentfirst}{false}}
\ExecuteOptions{indentfirst}

\def\ABNTcurrentoptions{}
\newcommand{\AddCurrentOptionToList}{%
  \ifx\ABNTcurrentoptions\@empty%
     \edef\ABNTcurrentoptions{\CurrentOption}%
  \else%
     \edef\ABNTcurrentoptions{\ABNTcurrentoptions,\CurrentOption}%
  \fi%
}

%% All options not defined are passed to `report'
\DeclareOption*{%
  \AddCurrentOptionToList
% if some font or paper option is passed, a flag is set.
  \ifthenelse{\equal{\CurrentOption}{10pt}\or\equal{\CurrentOption}{11pt}}%
    {\setboolean{ABNTfontsize}{true}}{}%
  \ifthenelse{\equal{\CurrentOption}{a5paper}\or%
              \equal{\CurrentOption}{b5paper}\or%
              \equal{\CurrentOption}{letterpaper}}%
    {\setboolean{ABNTpaper}{true}}{}%
  \ifthenelse{\equal{\CurrentOption}{openany}}%
    {\setboolean{ABNTopen}{true}}{}%
  \PassOptionsToClass{\CurrentOption}{report}}


% testing if user use other options for font size or paper
% than 12pt, a4paper and openright
\newboolean{ABNTfontsize}
\setboolean{ABNTfontsize}{false}
\newboolean{ABNTpaper}
\setboolean{ABNTpaper}{false}
\newboolean{ABNTopen}
\setboolean{ABNTopen}{false}

% Process options (without star -> in the order of definition!).
\ProcessOptions

% After process options, flags are properly set.
% Passing options to class, that will be loaded in \LoadClass
\ifthenelse{\boolean{ABNTfontsize}}%
  {}{\PassOptionsToClass{12pt}{report}}
\ifthenelse{\boolean{ABNTpaper}}%
  {}{\PassOptionsToClass{a4paper}{report}}
\ifthenelse{\boolean{ABNTopen}}%
  {}{\PassOptionsToClass{openright}{report}}


%%%%%%%%% Lying to report :-)         ->  working
%%
%% Report says:  \newcounter{figure}[chapter], \newcounter{table}[chapter]
%% But this is not ABNT (figure counter should not reset to 1 if chapter
%% increments). There is no straight forward way to "\renewcounter" 
%% then. So I have to make an work around.
%%
%% Idea: redefine \newcounter s.t. id newcounter is figure or table, then do
%% what I want (do not include [chapter] in the command). Otherwise, do
%% normal \newcounter.
%%
%% Advantage of this: some package may suppose that the counters of figure
%% and table are actually figure and table, and not ABNTfigure, ABNTtable,
%% as in previous versions

\ifthenelse{\boolean{ABNTfigtabnumbers}}
 {
   % saving old \newcounter
   \let\ABNToldnewcounter\newcounter\relax
   \def\ABNTeatbrackets[#1]{\relax}
   \renewcommand{\newcounter}[1]%
     {\ifthenelse{\equal{#1}{figure}\or\equal{#1}{table}}%
        {\ABNToldnewcounter{#1}\@ifnextchar[{\ABNTeatbrackets}{}}%
        {\ABNToldnewcounter{#1}}%
     }
 }
 {}

%%%%%%%%%%%%       LOADIND  REPORT CLASS       %%%%%%%%%%%%
% Load base class using current setting for basic options.
\LoadClass{report}

\ifthenelse{\boolean{ABNTfigtabnumbers}}
 {
  %% undoing redefinition of \newcounter and fixing \the(counters)
  \let\newcounter\ABNToldnewcounter\relax
  \renewcommand{\thefigure}{\arabic{figure}}
  \renewcommand{\thetable}{\arabic{table}}
 }
 {}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%                                                                  %%
%%                         IMPLEMENTATION                           %%
%%                                                                  %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Stretch factor for default line spacing schemes

\newcommand*{\taxaespacosimples}{1.5}
\newcommand*{\taxaespacoumemeio}{1.5}
\newcommand*{\taxaespacoduplo}{1.5}


%%%%%%%%   Load interesting packages : OBSOLET!!!   %%%%%%%%%%%%%%%%


\ifthenelse{\boolean{ABNTcommonpack}}%
 {%
   \typeout{ABNT: Opcao 'pacotescomuns' ativa!}
   % fontenc[T1] --> removed for possible pdf compatibility
   % inputenc[latin1]: more common input encoding
   \typeout{ABNT -> incluindo inputenc[utf8]}%
   \RequirePackage[latin1]{inputenc}%
   % amsmath: AMS math environments for LaTeX
   \typeout{ABNT -> incluindo amsmath}%
   \RequirePackage{amsmath}%
   % amssymb: AMS symbols
   \typeout{ABNT -> incluindo amssymb}%
   \RequirePackage{amssymb}%
   % amsbsy: bold version of symbols in amssymb
   \typeout{ABNT -> incluindo amsbsy}%
   \RequirePackage{amsbsy}%
   % dsfont: double stroke fonts (as IR, IN, etc)
   \IfFileExists{dsfont.sty}{%
     \typeout{ABNT -> incluindo dsfont}%
     \RequirePackage{dsfont}}{}%
   % eucal[mathscr]: new calligraphic letters
   \typeout{ABNT -> incluindo eucal[mathscr]}%
   \RequirePackage[mathscr]{eucal}%
   % makeidx -> removed. Useless if the user don't care about.  
 }%
 {}%

%%%%%%   Package for proper line spacing commands and environments

\IfFileExists{setspace.sty}%
{\RequirePackage{setspace}}% then
% else
{% 
% first a warning at the end of the document and than 
% fake the \setstretch command, not provided by setspace.
\AtEndDocument{\ClassWarningNoLine{abnt_UFF}%
% warning text
%   Package 'setspace' needed and was not found.
%   Please install it or check for errors in loading it.
%   It can be found at CTAN (www.ctan.org), for example.
%   For more information, refer to the class manual.
{-----------------------------------------------\MessageBreak%
O pacote 'setspace' eh necessario e nao foi\MessageBreak%
encontrado. Favor instala-lo propriamente ou\MessageBreak%
checar por erros em sua leitura. Ele pode ser\MessageBreak%
encontrado na CTAN (www.ctan.org), por exemplo.\MessageBreak%
Para mais informacoes, leia o manual da classe.\MessageBreak%
-----------------------------------------------}%
}%
\ifthenelse{\isundefined{\@currsize}}
  {\providecommand{\setstretch}[1]{\def\baselinestretch{#1}\normalsize}}
  {\providecommand{\setstretch}[1]{\def\baselinestretch{#1}\@currsize}}
}

% This command is defined by 'setspace' package, to ajust extra spacing
% before and after display math. It depends on if your setspace.sty is of
% 21 march 1998 or ouder. 
\providecommand{\setdisplayskipstretch}[1]{\relax}

% equivalent to the option 'nodisplayskipstretch' of setspace.
\setdisplayskipstretch{1.0}


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%    Setting margins
%%       (old Margin care mechanism removed since version 1 beta.)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\ifthenelse{\boolean{ABNTheader}}%
  {%
   %%%%   VERTICAL LENGHTS  %%%%
   % The distance beetwen the top of the header and the top of the text is
   % of 1cm, this is,  1cm=\headheight+\headsep
   % ...but, we have to consider the depth of the header, addin 2mm.
   \setlength{\headsep}{1.2cm-\headheight}
   % The distance beetwen the paper border and the number must be 2cm
   % 2cm=\topmargin+\voffset+1in
    \setlength{\topmargin}{2cm-1in-\voffset} 
   % The inferior border must be 2cm
   % \paperheight=\topmargin+\voffset+1in+\headheight+\headsep+\textheight+2cm
    \setlength{\textheight}% 
      {\paperheight-\topmargin-\voffset-1in-\headheight-\headsep-2cm}
  }%
  {% no header is not ABNT!!!
   % Let's fake it: 2cm each vertical margin and de same horizontal margin.
   \setlength{\topmargin}{2cm-\headheight-\headsep-\voffset-1in}
   \setlength{\textheight}% 
      {\paperheight-2cm-\footskip-2cm}
  }%

%%%%   HORIZONTAL LENGHTS   %%%%
% The left margin is 3cm, and the right margin equals to 2cm.
\setlength{\oddsidemargin}{3cm-\hoffset-1in}
% for compatibility with twoside print, the length of the margins must
% be exchanged.
\setlength{\evensidemargin}{2cm-\hoffset-1in}
% \paperwidth=\textwidth+\oddsidemargin+\hoffset+1in+2cm
\setlength{\textwidth}{\paperwidth-\oddsidemargin-\hoffset-1in-2cm}



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%    Page styles available: 
%         plainheader, header, ruledheader
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% fontstyle for header elements
\newcommand{\rightmarkformat}{\small}
\newcommand{\leftmarkformat}{\small}
\newcommand{\thepageformat}{\small}
% 

\newcommand{\ABNTmarkboth}[2]{%
 \ifthenelse{\boolean{ABNTNextOutOfTOC}}
     {\markboth{\ABNTnextmark}{\ABNTnextmark}}
     {\markboth{#1}{#2}}%
 }

\newcommand{\ABNTmarkright}[1]{%
 \ifthenelse{\boolean{ABNTNextOutOfTOC}}
     {\markright{\ABNTnextmark}}
     {\markright{#1}}%
 }


%%%%%%%  Defining pagestyle "header"
%
\newcommand{\ps@header}{%
  \renewcommand{\@oddfoot}{}%
  \renewcommand{\@evenfoot}{}%
  \renewcommand{\@oddhead}%
    {{\rightmarkformat\rightmark}\hfill{\thepageformat\thepage}}%
  \renewcommand{\@evenhead}%
       {{\thepageformat\thepage}\hfill{\leftmarkformat\leftmark}}%
}% 
 %%  Defining pagestyle plainheader
%
\newcommand{\ps@plainheader}{%
  \renewcommand{\@oddfoot}{}%
  \renewcommand{\@evenfoot}{}%
  \renewcommand{\@oddhead}{\hfill{\thepageformat\thepage}}%
  \renewcommand{\@evenhead}{{\thepageformat\thepage}\hfill}%
% Para \chapter* mostrar o cabecalho
  \let\@mkboth\ABNTmarkboth%
% Definindo a maneira como o comando o \chapter marca o cabecalho  
}% 
 %%  Defining pagestyle ruledheader
%
% \newcommand{\ps@ruledheader}{%
%   \renewcommand{\@oddfoot}{}%
%   \renewcommand{\@evenfoot}{}%
%   \renewcommand{\@oddhead}%
%      {\underline{\makebox[\textwidth]{\raisebox{-.5ex}{}%
%        {\rightmarkformat\rightmark}\hfill{\thepageformat\thepage}}}}%
%   \renewcommand{\@evenhead}%
%      {\underline{\makebox[\textwidth]{\raisebox{-.5ex}{}%
%        {\thepageformat\thepage}\hfill{\leftmarkformat\leftmark}}}}%
%   \let\@mkboth\ABNTmarkboth%
%   \renewcommand{\chaptermark}[1]{%
%     \markboth%
%        {\ifnum \c@secnumdepth >\m@ne%
%             \thechapter\ \ %
%         \fi%
%         ##1}%
%        {\ifnum \c@secnumdepth >\m@ne%
%             \thechapter\ \ %
%         \fi%
%         ##1}%
%   }%
  % \renewcommand{\sectionmark}[1]{%
  %   \markright{%
  %     \ifnum \c@secnumdepth >\z@%
  %       \thesection\ \ %
  %     \fi%
  %     ##1}%
  % }%   
% }% 


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%    Page numbering 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\newboolean{ABNTinpretext}
\setboolean{ABNTinpretext}{false}

\newboolean{ABNTaftertoc}
\setboolean{ABNTaftertoc}{false}

% The command \ABNTBeginOfTextualPart is executed by \tableofcontents at
% its end. It's intented to page style and page number settings.
\providecommand{\ABNTBeginOfTextualPart}{}

\newcommand{\chaptertitlepagestyle}{
  \pagestyle{headings}
  \markright{\thepage}
}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%  Line spacing stuff
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Since version 0.3 the `setspace' package is used.

% Space scheme in notes (footnotes and margin notes) removed since
% version 0.3 since setspace do not support it; footnotes are always
% single spaced!

% \espaco{} - ativa o espacamento para um numero dado (taxa de
% esticamento), mas aceita os parametros simples, umemeio, e duplo.

\newcommand{\espaco}[1]%
{\ifthenelse{\equal{#1}{simples}}% se espacamentos simples
  {\setstretch{\taxaespacosimples}} % entao
  { %senao (espaco simples)
   \ifthenelse{\equal{#1}{umemeio}}% se espaco 1 1/2
     {\setstretch{\taxaespacoumemeio}} % entao
     {%senao (espaco 1 1/2)
      \ifthenelse{\equal{#1}{duplo}}% se espaco duplo
        {\setstretch{\taxaespacoduplo}}% entao
        {\setstretch{#1}} % senao espaco dado
     } %fim se espaco 1 1/2
  } %fim se espaco simples
}%fim newcommand

\newenvironment{espacosimples}
  {\begin{spacing}{\taxaespacosimples}}{\end{spacing}}

\newenvironment{espacoumemeio}
  {\begin{spacing}{\taxaespacoumemeio}}{\end{spacing}}

\newenvironment{espacoduplo}%
  {\begin{spacing}{\taxaespacoduplo}}{\end{spacing}}

\newboolean{ABNThypertoc}
\AtBeginDocument{%
% default spacing (set by class options)
\espaco{\ABNTespacodefault}%
\@ifpackageloaded{hyperref}{\setboolean{ABNThypertoc}{true}}{\setboolean{ABNThypertoc}{false}}%
}


% Font track mechanism (like in utthesis.cls)
% - removed from implementation since version 0.3.
% - use instead package `relsize'.



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%    Chapter title page style
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Redefining \chapter and \part. The changes are
%  - \chapteritlepagestyle instead of explict plain page style
%  - \ABNTchaptermark instead of \chaptermark (must be before
%       \addcontentsline !!!)
% - several commands were replaced by abntversions due to nuances of the
%   norms :-( it can create several uncompatibilities with packages that
%   change explictily these important commands, although I have tried very
%   hard to make as less damage on compatibility as possible. As a result
%   of this, package hyperref is totally broken with abnt.cls.

%%%%%%%%%%%%%%%%%%%%%%   Special definitions   %%%%%%%%%%%%%%%%%%%%
% What is going on here?
%   
%  This class supports auto include in toc for both \chapter* and
%  \section* (and similars). As we know, the command \chapter admits an
%  optional argument, which goes to the toc and the marks, if it's present
%  (otherwise the main parameter of \chapter is used in toc and marks also.)
%  
%  To allow exactly the same mechanism for \chapter and \chapter*, \section
%  and \section*, \subsection and \subsection*, etc, I had to define
%  similar commands to some important core commands in LaTeX, like \secdef
%  (we make a new one to avoid conflicts with other packages) and
%  \@startsection (I make a new one too).
%
%  Now, \ABNTstartsection, appart from make the stared version of a
%  section-like command to include the title in toc (if a boolean is set to
%  true), the title is centered for stared form.
%
%  Now, \chapter* and \part* are almost equal to \chapter and \part
%
%  The origin of this material are the files 
%     $texmfDIR/tex/latex/base/latex.ltx  (codigo fonte do LaTeX)
%     $texmfDIR/tex/latex/base/report.cls (classe standard)

% From the definition of \secdef -> stared version now admits optional
% param (after bug with hyperref, it was no longer used.)
\def\ABNTsecdef#1#2{\@ifstar{\@dblarg{#2}}{\@dblarg{#1}}}

\newcommand{\chaptertype}{}%
\renewcommand\chapter%
  {%
  \secdef\@chapter\@schapter%
  }%

% To make pre-textual chapters (that fits page numbering squeme...)
% this is equal to \chapter*{}, but ignores in witch part is it. It does
% not change any tags.
\newcommand\pretextualchapter%
    {%
     \if@openright\cleardoublepage\else\clearpage\fi%
     \thispagestyle{\chaptertitlepagestyle}
     \renewcommand{\rmdefault}{phv}
     \global\@topnum\z@%
     \@afterindentfalse%
     \@schapter%
    }%

% Created useful \resetsubcounters from the code of \stepcounter.
\newcommand{\resetsubcounters}[1]{%
  \begingroup
    \let\@elt\@stpelt
    \csname cl@#1\endcsname
  \endgroup}

%% \ProximoForaDoSumario -> taking out some chapter or section from toc.

\newboolean{ABNTNextOutOfTOC}
\setboolean{ABNTNextOutOfTOC}{false}

%% \ProximoForaDoSumario[mark text]
% Now \ProximoForaDoSumario (re)sets the marks too. If one still want the
% marks, he/she must use it as the optional parameter of this command.

\newcommand{\ABNTnextmark}{}
\newcommand{\ProximoForaDoSumario}[1][]


\newcommand{\ABNTaddcontentsline}[3]%

\newcommand{\ABNTchaptermark}[1]

\newcommand{\ABNTsectionmark}[1]


% Fonts in \@part and \@part* changed. Some \resetsubcounters added.
\def\@part[#1]#2{%
    \ifnum \c@secnumdepth >-2\relax
      \refstepcounter{part}%
      \ABNTaddcontentsline{toc}{part}{\protect\numberline{\thepart}#1}%
    \else
      \resetsubcounters{part}
      \ABNTaddcontentsline{toc}{part}{#1}%
    \fi
    \markboth{}{}%
    {\centering
     \interlinepenalty \@M
     \normalfont
     \ifnum \c@secnumdepth >-2\relax
       \ABNTchapterfont\huge\ifthenelse{\boolean{ABNTcapchap}}%
          {\MakeUppercase{\partname~\thepart}}%
          {\partname~\thepart}
       \par
       \vskip 20\p@
     \fi
     \ABNTchapterfont\Huge\ifthenelse{\boolean{ABNTcapchap}}%
          {\MakeUppercase{#2}}%
          {#2}\par}%
    \@endpart}

\def\@spart#1{%
    \ABNTaddcontentsline{toc}{part}{#1}%
    \markboth{}{}%
    {\centering
     \interlinepenalty \@M
     \normalfont
     \ABNTchapterfont\Huge\ifthenelse{\boolean{ABNTcapchap}}%
          {\MakeUppercase{#1}}%
          {#1}\par}%
    \@endpart}


% From \@startsection. The only difference is that it calls \@ssect
% changing the meaning id the first parameter. Now, instead of indentation,
% it gives section level for TOC purposes.
\def\ABNTstartsection#1#2#3#4#5#6{%
  \if@noskipsec \leavevmode \fi
  \par
  \@tempskipa #4\relax
  \@afterindenttrue
  \ifdim \@tempskipa <\z@
    \@tempskipa -\@tempskipa \@afterindentfalse
  \fi
  \if@nobreak
    \everypar{}%
  \else
    \addpenalty\@secpenalty\addvspace\@tempskipa
  \fi
  \@ifstar
    {\ABNTssect{#1}{#4}{#5}{#6}}% #3 replaced by #1 here
    {\@dblarg{\ABNTsect{#1}{#2}{#3}{#4}{#5}{#6}}}}

% I change the meaning of the first paramenter here. Instead of an indent
% skip, it is now the name of the section, for `toc' purposes.
\def\ABNTssect#1#2#3#4#5{%
  \@tempskipa #3\relax
  \ifdim \@tempskipa>\z@
    \begingroup
      #4{%
         \interlinepenalty \@M \centering
         \ifthenelse{\boolean{ABNTcapsec}}
             {\MakeUppercase{#5}}{#5}\@@par}%
    \endgroup
    \@ifundefined{ABNT#1mark}{}{\csname ABNT#1mark\endcsname{#5}}
    \ifthenelse{\boolean{ABNTincludeintoc}}
      {\ABNTaddcontentsline{toc}{#1}{#5}}
     {}
  \else
    \def\@svsechd{#4{#5}%
      \@ifundefined{ABNT#1mark}{}{\csname ABNT#1mark\endcsname{#5}}
      \ifthenelse{\boolean{ABNTincludeintoc}}%
         {\ABNTaddcontentsline{toc}{#1}{#5}}{}
    }%
  \fi
  \@xsect{#3}}

\def\ABNTsect#1#2#3#4#5#6[#7]#8{%
  \ifnum #2>\c@secnumdepth
    \let\@svsec\@empty
  \else
    \refstepcounter{#1}%
    \protected@edef\@svsec{\@seccntformat{#1}\relax}%
  \fi
  \@tempskipa #5\relax
  \ifdim \@tempskipa>\z@
    \begingroup
      #6{%
        \@hangfrom{\hskip #3\relax\@svsec}%
          \interlinepenalty \@M
          \ifthenelse{\boolean{ABNTcapsec}}
             {\MakeUppercase{#8}}{#8}\@@par}%
    \endgroup
    \@ifundefined{ABNT#1mark}{}{\csname ABNT#1mark\endcsname{#7}}
    \ABNTaddcontentsline{toc}{#1}{%
      \ifnum #2>\c@secnumdepth \else
        \protect\numberline{\csname the#1\endcsname}%
      \fi
      #7}%
  \else
    \def\@svsechd{%
      #6{\hskip #3\relax
      \@svsec \ifthenelse{\boolean{ABNTcapsec}}
             {\MakeUppercase{#8}}{#8}}%
      \@ifundefined{ABNT#1mark}{}{\csname ABNT#1mark\endcsname{#7}}
      \ABNTaddcontentsline{toc}{#1}{%
        \ifnum #2>\c@secnumdepth \else
          \protect\numberline{\csname the#1\endcsname}%
        \fi
        #7}}%
  \fi
  \@xsect{#5}}


%%%%%%%%%%%%%%%%%%   end of Special definitions   %%%%%%%%%%%%%%%%


% adding style for page numbers required by NBR 6027

\let\old@dottedtocline\@dottedtocline
\renewcommand{\@dottedtocline}[5]{%
  \ifthenelse{\boolean{ABNTpagenumstyle}}
     {%
      {\renewcommand{\@pnumwidth}{2.5em}%
       \renewcommand{\@tocrmarg}{3.5em}
       \old@dottedtocline{#1}{#2}{#3}{#4}%
             {\ifthenelse{\equal{#5}{}}{}{p.\thinspace#5}}}%
     }%
     {\old@dottedtocline{#1}{#2}{#3}{#4}{#5}}%
}



%% Font which chapter titles will be printed
\ifthenelse{\boolean{ABNTcapchap}}
  {\newcommand{\ABNTchapterfont}{\bfseries\slshape}}
  {\newcommand{\ABNTchapterfont}{\bfseries\itshape}}
\newcommand{\ABNTtocchapterfont}{\ABNTchapterfont\upshape}

%% Font which section titles will be printed
\newcommand{\ABNTsectionfont}{\bfseries}

%% In order to \MakeUppercase do not apply to math mode in chapter or
%% section titles, package textcase used
%
% Sorry, a bug on textcase adds extra space before text. User can fix it by
% him/herself.
%
%\ifthenelse{\boolean{ABNTcapchap}\or\boolean{ABNTcapsec}}
%  {\IfFileExists{textcase.sty}
%     {\RequirePackage[overload]{textcase}}
%     {}
%  }
%  {}
\newcommand{\ABNTchaptersize}{\huge}

\def\@makechapterhead#1{%
\vspace*{50\p@}%
{\parindent \z@ \raggedright \normalfont
  \interlinepenalty\@M
  \Large \bfseries #1\par\nobreak
  \vskip 40\p@
}}
\def\@makeschapterhead#1{%
\vspace*{50\p@}%
{\parindent \z@ \raggedright
  \normalfont
  \interlinepenalty\@M
  \Large \bfseries  #1\par\nobreak
  \vskip 40\p@
}}



% % Defining how is typeset the \chapter*
% \def\@makeschapterhead#1{%
% \thispagestyle{empty}%
%   \vspace*{0pt}\par
%   {\centering\normalfont\ABNTchaptersize\ABNTchapterfont%
%  % \interlinepenalty\@M
%  %%         \vspace{50pt}
%  %       \par\nobreak  \ifthenelse{\boolean{ABNTcapchap}}
%    \ifthenelse{\boolean{ABNTcapchap}}%
%      {\MakeUppercase{#1}}%
%      {#1}
%     \par}%
%   \vspace{50pt}%
%   \par%
% }

% redefining to apply tocnumpageabnt
\renewcommand\l@chapter[2]{%
  \ifnum \c@tocdepth >\m@ne
    \addpenalty{-\@highpenalty}%
    \vskip 1.0em \@plus\p@
    \setlength\@tempdima{1.5em}%
    \begingroup
      \ifthenelse{\boolean{ABNTpagenumstyle}}
        {\renewcommand{\@pnumwidth}{3.5em}}
        {}
      \parindent \z@ \rightskip \@pnumwidth
      \parfillskip -\@pnumwidth
      \leavevmode \normalsize\ABNTtocchapterfont
      \advance\leftskip\@tempdima
      \hskip -\leftskip
      #1\nobreak\hfil \nobreak%
      \ifthenelse{\boolean{ABNTpagenumstyle}}
         {%
          \hb@xt@\@pnumwidth{\hss 
            \ifthenelse{\not\equal{#2}{}}{{\normalfont p.\thinspace#2}}{}}\par
         }
         {%
          \hb@xt@\@pnumwidth{\hss #2}\par
         }
      \penalty\@highpenalty
    \endgroup
  \fi}

% redefine to apply style
\renewcommand\part{%
  \if@openright\cleardoublepage\else\clearpage\fi%
  \thispagestyle{\chaptertitlepagestyle}%
  \if@twocolumn\onecolumn\@tempswatrue\else\@tempswafalse\fi%
  \null\vfil\secdef\@part\@spart}%

\renewcommand\l@part[2]{%
  \ifnum \c@tocdepth >-2\relax
    \addpenalty{-\@highpenalty}%
    \addvspace{2.25em \@plus\p@}%
    \begingroup
      \parindent \z@ \rightskip \@pnumwidth
      \parfillskip -\@pnumwidth
      \noindent{\leavevmode
       \ABNTtocchapterfont\large\noindent%
          #1\hfil \hb@xt@\@pnumwidth{\hss #2}}\par
       \nobreak
         \global\@nobreaktrue
         \everypar{\global\@nobreakfalse\everypar{}}%
    \endgroup
  \fi}


\renewcommand\section{\ABNTstartsection{section}{1}{\z@}%
                           {-3.5ex \@plus -1ex \@minus -.2ex}%
                           {2.3ex \@plus.2ex}%
                           {\espaco{simples}\normalfont%
                            \large\bf}}
\renewcommand\subsection{\ABNTstartsection{subsection}{2}{\z@}%
                           {-3.25ex\@plus -1ex \@minus -.2ex}%
                           {1.5ex \@plus .2ex}%
                           {\espaco{simples}\normalfont%
                            \large}}
\renewcommand\subsubsection{\ABNTstartsection{subsubsection}{3}{\z@}%
                           {-3.25ex\@plus -1ex \@minus -.2ex}%
                           {1.5ex \@plus .2ex}%
                           {\espaco{simples}\normalfont%
                            \normalsize}}
\renewcommand\paragraph{\ABNTstartsection{paragraph}{4}{\parindent}%
                           {3.25ex \@plus1ex \@minus.2ex}%
                           {-1em}%
                           {\espaco{simples}\normalfont%
                            \normalsize}}
\renewcommand\subparagraph{\ABNTstartsection{subparagraph}{5}{\parindent}%
                           {3.25ex \@plus1ex \@minus .2ex}%
                           {-1em}%
                           {\espaco{simples}\normalfont%
                            \normalsize}}

%\renewcommand*\l@section{\@dottedtocline{1}{1.5em}{2.3em}}
%\renewcommand*\l@subsection{\@dottedtocline{2}{3.8em}{3.2em}}
%\renewcommand*\l@subsubsection{\@dottedtocline{3}{7.0em}{4.1em}}
%\renewcommand*\l@paragraph{\@dottedtocline{4}{10em}{5em}}
%\renewcommand*\l@subparagraph{\@dottedtocline{5}{12em}{6em}}

%%%%%%%%%% Implementation for Annex and Appendix
%

\providecommand{\annexname}{Anexo}
\providecommand{\appendixname}{Ap\^endice} % for completeness ;-)
\newcommand{\anapchaptername}{\relax}

\newcommand*{\ABNTtravessao}{-$\!$-}

\def\@anapchapter[#1]#2%
      {
       \refstepcounter{chapter}%
       \ifthenelse{\boolean{ABNTAnApName}}
        {
         \begingroup
         \ifthenelse{\equal{#1}{}}
            {\def\thechapter{\anapchaptername{} \Alph{chapter}}}
            {\def\thechapter{\anapchaptername{} \Alph{chapter}{}
                                \ABNTtravessao{} #1}} 
         \ABNTchaptermark{}
         \endgroup
         \if@twocolumn
           \@topnewpage[\@makeanapchapterhead{#2}]%
         \else
           \@makeanapchapterhead{#2}%
           \@afterheading
         \fi
        }
        {
         \ABNTchaptermark{#1}
         \if@twocolumn
            \@topnewpage[\@makechapterhead{#2}]%
         \else
            \@makechapterhead{#2}%
            \@afterheading
         \fi
        }
       \ifnum \c@secnumdepth >\m@ne
         \typeout{\@chapapp\space\thechapter.}%
         \ifthenelse{\boolean{ABNTAnApName}}{
           \ifthenelse{\equal{#1}{}}
              {\ABNTaddcontentsline{toc}{chapter}%
                  {\anapchaptername{} \thechapter}}
              {\ABNTaddcontentsline{toc}{chapter}%
                  {\anapchaptername{} \thechapter{} \ABNTtravessao{} #1}}
         }
         {
          \ABNTaddcontentsline{toc}{chapter}%
                   {\protect\numberline{\thechapter}#1}
         }  
       \else
         \ABNTaddcontentsline{toc}{chapter}{#1}
       \fi
       \par
      }


\newlength{\ABNTanapindent}
\setlength{\ABNTanapindent}{0cm}

\newcommand{\ABNTanapsize}{\LARGE}

\newcommand{\ABNTaposindicativoanap}{\relax}

\def\@makeanapchapterhead#1{%
  {%
%  \noindent\rule{\textwidth}{1.7pt}\\\par
  \normalfont\ABNTchapterfont\ABNTanapsize
  \espaco{simples}
  \ifthenelse{\boolean{ABNTAnApIndicativoIndent}}
    {\ifthenelse{\boolean{ABNTCapAnnexAppendix}}
       {\settowidth{\ABNTanapindent}{\MakeUppercase{\anapchaptername}
          \thechapter{} \ABNTtravessao{} }}
       {\settowidth{\ABNTanapindent}{\anapchaptername} 
          \thechapter{} \ABNTtravessao{} }
    }
    {}
  \vspace*{30pt}
%
  \raggedright\espaco{1.2}\par  
  \begin{list}{}{%
       \setlength{\listparindent}{0cm}%
       \setlength{\itemindent}{-\ABNTanapindent}%
       \setlength{\rightmargin}{0cm}%
       \setlength{\leftmargin}{\ABNTanapindent}%
       \setlength{\parsep}{0pt}}%
    \item %
      \ifthenelse{\equal{#1}{}}
         {\ifthenelse{\boolean{ABNTCapAnnexAppendix}}
            {\MakeUppercase{\anapchaptername}}
            {\anapchaptername} 
          \thechapter \ABNTaposindicativoanap}
         {\ifthenelse{\boolean{ABNTCapAnnexAppendix}}
            {\MakeUppercase{\anapchaptername}}
            {\anapchaptername}
          \thechapter{} \ABNTtravessao{} \ABNTaposindicativoanap
            \ifthenelse{\boolean{ABNTcapchap}}%
              {\MakeUppercase{#1}}%
              {#1}}
  \end{list}
  \par\vspace{50pt}%
  }%
}

\renewcommand{\appendix}{
  \setcounter{chapter}{0}
  \resetsubcounters{chapter}
  \gdef\thechapter{\Alph{chapter}}
  \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{appen.}}{}
  \gdef\@chapapp{Apendice}
  \renewcommand{\anapchaptername}{\appendixname}
  \global\let\@chapter\@anapchapter}

\let\apendice\appendix

\newcommand{\annex}{
  \setcounter{chapter}{0}
  \resetsubcounters{chapter}
  \gdef\thechapter{\Alph{chapter}}
  \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{annex.}}{}
  \gdef\@chapapp{Anexo}
  \renewcommand{\anapchaptername}{\annexname}
  \global\let\@chapter\@anapchapter}

\let\anexo\annex

%%%%%%%%%%  end of code for Annex and Appendix

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%  Redefing important commands (those that set marks)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Redefining \tableofcontents, \listoffigures, \listoftables,
% thebibliography, theindex extracing explicit \MakeUpercase in page marks

\newboolean{ABNTrestorecol} % new boolean to avoid conflicts

% ====  \tableofcontents  ====
% do exactly what old \tableofcontents used to do, but had to be redefined
% since \chapter* (used in \tableofcontents' old definition) was redefined.
\renewcommand{\tableofcontents}{%
  \ifthenelse{\boolean{@twocolumn}}%
    {\setboolean{ABNTrestorecol}{true}\onecolumn}%
    {\setboolean{ABNTrestorecol}{false}}%
  \if@openright\cleardoublepage\else\clearpage\fi
  \thispagestyle{\chaptertitlepagestyle}
  \global\@topnum\z@
  \@afterindentfalse
  \@makeschapterhead{\contentsname}%
  \@afterheading
  \@mkboth{\contentsname}{\contentsname}
  \@starttoc{toc}%
  \ifthenelse{\boolean{ABNTrestorecol}}{\twocolumn}{}%
  \if@openright\cleardoublepage\else\clearpage\fi%
  \setboolean{ABNTaftertoc}{true}
}%

\let\sumario\tableofcontents\relax

% ====  \listoffigures  ====
% In the same spirit of table of contents, it does the same as the old one,
% but now a test was included due "complete contents" feature.
\renewcommand{\listoffigures}{%
  \ifthenelse{\boolean{@twocolumn}}%
    {\setboolean{ABNTrestorecol}{true}\onecolumn}%
    {\setboolean{ABNTrestorecol}{false}}%
  \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{listoffigures.}}{}
  \pretextualchapter{\listfigurename}
  \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{}}{}
  \@starttoc{lof}%
  \ifthenelse{\boolean{ABNTrestorecol}}{\twocolumn}{}%
}%

\let\listadefiguras\listoffigures\relax

% ====  \listoftables  ====
% Same comments in \listoffigures
\renewcommand\listoftables{%
  \ifthenelse{\boolean{@twocolumn}}%
    {\setboolean{ABNTrestorecol}{true}\onecolumn}%
    {\setboolean{ABNTrestorecol}{false}}%
  \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{listoftables.}}{}
  \pretextualchapter{\listtablename}
  \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{}}{}
  \@starttoc{lot}%
  \ifthenelse{\boolean{ABNTrestorecol}}{\twocolumn}{}%
}%

\let\listadetabelas\listoftables\relax

% ====  thebibliography  ====
% Almost equal to old thebibliography, but without capital page marks
% and automatically in toc if active ``sumario completo''
\renewenvironment{thebibliography}[1]%
  {% replacing \chapter*{\refname\@mkboth...}
   \if@openright\cleardoublepage\else\clearpage\fi%
   \thispagestyle{\chaptertitlepagestyle}%
   \global\@topnum\z@%
   \@afterindentfalse%
   \@mkboth{\refname}{\refname}% end \chapter*{\refname...}
   \ifthenelse{\boolean{ABNTincludeintoc}}%
      {\ABNTaddcontentsline{toc}{chapter}{\refname}}%
      {}%
    \if@twocolumn%
      \@topnewpage[\@makeschapterhead{\refname}]%
    \else%
      \@makeschapterhead{\refname}%
      \@afterheading%
    \fi%
   \list{\@biblabel{\@arabic\c@enumiv}}%
        {\settowidth\labelwidth{\@biblabel{#1}}%
         \leftmargin\labelwidth%
         \advance\leftmargin\labelsep%
         \@openbib@code%
         \usecounter{enumiv}%
         \let\p@enumiv\@empty%
         \renewcommand\theenumiv{\@arabic\c@enumiv}}%
   \sloppy%
   \espaco{simples}
   \clubpenalty4000%
   \@clubpenalty \clubpenalty%
   \widowpenalty4000%
   \sfcode`\.\@m%
  }% end of \begin{thebibliography}
  {\def\@noitemerr
       {\@latex@warning{Empty `thebibliography' environment}}%
   \endlist%
  }% end of \end{thebibliography}

\newboolean{ABNTbalancedindex}
\setboolean{ABNTbalancedindex}{true}

\newcommand*\IndiceNaoBalanceado{\setboolean{ABNTbalancedindex}{false}}% ====  theindex  ====
% Similar to old theindex, but without capital page marks, automatically
% in toc and now with balanced colunms
\renewenvironment{theindex}%
  {%
   \ifthenelse{\boolean{@twocolumn}}%
     {\setboolean{ABNTrestorecol}{true}\onecolumn}%
     {\setboolean{ABNTrestorecol}{false}}%
   \if@openright\cleardoublepage\else\clearpage\fi%
   \thispagestyle{\chaptertitlepagestyle}%
   \global\@topnum\z@%
   \@afterindentfalse%
   \@mkboth{\indexname}{\indexname}% 
   \ifthenelse{\boolean{ABNTincludeintoc}}%
      {\ABNTaddcontentsline{toc}{chapter}{\indexname}}%
      {}%
   \@makeschapterhead{\indexname}%
   \@afterheading%
   \begingroup%
   \setlength{\columnsep}{35pt}%
   \setlength{\columnseprule}{0pt}
   \ifthenelse{\boolean{ABNTbalancedindex}}
     {\begin{multicols}{2}}
     {\begin{multicols*}{2}}%
   \espaco{simples}%
   \setlength{\parindent}{0cm}%
   \setlength{\parskip}{.3pt}%
   \let\item\@idxitem%
  }%
  {%
   \ifthenelse{\boolean{ABNTbalancedindex}}
     {\end{multicols}}
     {\end{multicols*}}%
   \endgroup%
   \ifthenelse{\boolean{ABNTrestorecol}}{\twocolumn}{}%
  }%

%%%%%%%%%%%%%% Flexibility on captions %%%%%%%%%%%%%%%%%
%
% Temporarely removed. Not really required.
%
%\newcommand{\ABNTcaptionsep}{: }
%
%\long\def\@makecaption#1#2{%
%  \vskip\abovecaptionskip
%  \sbox\@tempboxa{#1\ABNTcaptionsep #2}%
%  \ifdim \wd\@tempboxa >\hsize
%    #1\ABNTcaptionsep #2\par
%  \else
%    \global \@minipagefalse
%    \hb@xt@\hsize{\hfil\box\@tempboxa\hfil}%
%  \fi
%  \vskip\belowcaptionskip}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Environment `citado'=`citacao', similar to quoation, but with 4cm of
%% extra left margin, in a smaller font and simple line spacing.
 
\newenvironment{citado}%
  {\begin{espacosimples}%
   \small
   \begin{list}{}{%
       \setlength{\listparindent}{0cm}%
       \setlength{\itemindent}{\listparindent}%
       \setlength{\rightmargin}{0cm}%
       \setlength{\leftmargin}{4cm}%
       \setlength{\parsep}{0pt}}%
    \item\relax}%
  {\end{list}\end{espacosimples}}

\newenvironment{citacao}%
  {\begin{citado}}%
  {\end{citado}}%

%% Contents shows up to subsubsection. 
\setcounter{tocdepth}{4}

%% Section number will appear up to \subsubsection
\setcounter{secnumdepth}{3}



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                   Pre-textual elements                   %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% CAPA - contem autor, titulo (com subtitulo incluido), local e data.
%
% FOLHA DE ROSTO - contem, no anverso : autor, titulo (com subtitulo
% incluido, se houver), nome do curso e area de concentracao, orientador 
% ou orientadora e co-orientador ou co-orientadora (se for o caso), 
% local e ano da apresentacao.

\providecommand{\ABNTinstituicaodata}{}
\newcommand{\instituicao}[1]{\renewcommand{\ABNTinstituicaodata}{#1}}
\newcommand{\instituicaoformat}{\large\bf} % \LARGE\scshape}

\providecommand{\ABNTautordata}{}
\newcommand{\autor}[1]{\renewcommand{\ABNTautordata}{#1}}
\newcommand{\autorformat}{\large\bf}

\providecommand{\ABNTorientadordata}{}
\providecommand{\ABNTorientadorname}{}
\newcommand{\orientador}[2][{\bf Orientador}:\vspace{1mm}\\]%
  {\renewcommand{\ABNTorientadorname}{#1}%
   \renewcommand{\ABNTorientadordata}{#2}}
\newcommand{\orientadornameformat}{}
\newcommand{\orientadorformat}{\ABNTsectionfont}{\large}

\providecommand{\ABNTorientadoradata}{}
\providecommand{\ABNTorientadoraname}{}
\newcommand{\orientadora}[2][Orientadora:\vspace{1mm}\\]%
  {\renewcommand{\ABNTorientadoraname}{#1}%
   \renewcommand{\ABNTorientadoradata}{#2}}
\newcommand{\orientadoranameformat}{}
\newcommand{\orientadoraformat}{\large}

\providecommand{\ABNTcoorientadordata}{}
\providecommand{\ABNTcoorientadorname}{}
\newcommand{\coorientador}[2][Co-orientador:\vspace{1mm}\\]%
  {\renewcommand{\ABNTcoorientadorname}{#1}%
   \renewcommand{\ABNTcoorientadordata}{#2}}
\newcommand{\coorientadornameformat}{}
\newcommand{\coorientadorformat}{\large}

\providecommand{\ABNTcoorientadoradata}{}
\providecommand{\ABNTcoorientadoraname}{}
\newcommand{\coorientadora}[2][Co-orientadora:\vspace{1mm}\\]%
  {\renewcommand{\ABNTcoorientadoraname}{#1}%
   \renewcommand{\ABNTcoorientadoradata}{#2}}
\newcommand{\coorientadoranameformat}{}
\newcommand{\coorientadoraformat}{\large}

\providecommand{\ABNTtitulodata}{}
\newcommand{\titulo}[1]{\renewcommand{\ABNTtitulodata}{#1}}
\newcommand{\tituloformat}{\large\bf}

\providecommand{\ABNTcomentariodata}{}
\newcommand{\comentario}[1]{\renewcommand{\ABNTcomentariodata}{#1}}
\newcommand{\comentarioformat}{}

\providecommand{\ABNTlocaldata}{}
\newcommand{\local}[1]{\renewcommand{\ABNTlocaldata}{#1}}
\newcommand{\localformat}{\large\bf}

\providecommand{\ABNTdatadata}{}
\newcommand{\data}[1]{\renewcommand{\ABNTdatadata}{#1}}
\newcommand{\dataformat}{\large\bf}

\newcommand{\ABNTifnotempty}[2]{\ifthenelse{\not\equal{#1}{}}{#2}{}}


\newcommand{\folhaderosto}%
{%
\begin{titlepage}
\espaco{1.1}
\ABNTifnotempty{\ABNTautordata}%
  {%
  \begin{center}
    \autorformat\ABNTautordata
  \end{center}
  }
\vspace*{2.5cm}
\ABNTifnotempty{\ABNTtitulodata}%
  {%
   \begin{center}
     {\tituloformat\ABNTtitulodata\par}
   \end{center}
  }%
\vspace*{1cm}
\ABNTifnotempty{\ABNTcomentariodata}%
  {%
   \vspace{.8cm}
   \hspace{.50\textwidth}
     \begin{minipage}{.48\textwidth}
       \begin{\espaco{1.5}}
         {\comentarioformat\ABNTcomentariodata}\par
       \end{\espaco{1.5}}
     \end{minipage}
   }
\vspace{.8cm}
\vspace{4cm}
\begin{center}
\ABNTifnotempty{\ABNTorientadordata}%
  {%
   {\orientadornameformat\ABNTorientadorname}
   {\orientadorformat\ABNTorientadordata}\protect\\
   \vspace{0.7cm}
  }
  
\ABNTifnotempty{\ABNTorientadoradata}%
  {%
   {\orientadoranameformat\ABNTorientadoraname}
   {\orientadoraformat\ABNTorientadoradata}\protect\\
   \vspace{0.7cm}
  }

\ABNTifnotempty{\ABNTcoorientadordata}
  {%
   {\coorientadornameformat\ABNTcoorientadorname}
   {\coorientadorformat\ABNTcoorientadordata}
  }
  
\ABNTifnotempty{\ABNTcoorientadoradata}
  {%
   {\coorientadoranameformat\ABNTcoorientadoraname}
   {\coorientadoraformat\ABNTcoorientadoradata}
  }

\end{center}
\begin{center}
  \ABNTifnotempty{\ABNTlocaldata}
      {{\localformat\ABNTlocaldata}\par}
    \ABNTifnotempty{\ABNTdatadata}
      {{\dataformat\ABNTdatadata}}

\end{center}
\end{titlepage}
}% end of \folhaderosto

%\newcommand{\folhaderosto}%
%{%
%\begin{titlepage}
%\espaco{1.1}
%\ABNTifnotempty{\ABNTautordata}%
%  {%
%  \begin{center}
%    \autorformat\ABNTautordata
%  \end{center}
%  }
%\vfill\vfill\vfill
%\ABNTifnotempty{\ABNTtitulodata}%
%  {%
%   \begin{center}
%     {\tituloformat\ABNTtitulodata\par}
%   \end{center}
%  }%
%\ABNTifnotempty{\ABNTcomentariodata}%
%  {%
%   \vspace{.8cm}
%   \hspace{.45\textwidth}
%     \begin{minipage}{.5\textwidth}
%       \begin{espacosimples}
%         {\comentarioformat\ABNTcomentariodata}\par
%       \end{espacosimples}
%     \end{minipage}
%   }
%\vspace{.8cm}
%\begin{center}
%\ABNTifnotempty{\ABNTorientadordata}%
%  {%
%   {\orientadornameformat\ABNTorientadorname}
%   {\orientadorformat\ABNTorientadordata}\protect\\
%   \vspace{0.7cm}
%  }
%\ABNTifnotempty{\ABNTorientadoradata}%
%  {%
%   {\orientadoranameformat\ABNTorientadoraname}
%   {\orientadoraformat\ABNTorientadoradata}\protect\\
%   \vspace{0.7cm}
%  }
%\ABNTifnotempty{\ABNTcoorientadordata}
%  {%
%   {\coorientadornameformat\ABNTcoorientadorname}
%   {\coorientadorformat\ABNTcoorientadordata}
%  }
%\ABNTifnotempty{\ABNTcoorientadoradata}
%  {%
%   {\coorientadoranameformat\ABNTcoorientadoraname}
%   {\coorientadoraformat\ABNTcoorientadoradata}
%  }

%\end{center}
%\vfill
%\begin{center}
%\begin{espacosimples}
%  \setlength{\parskip}{.3cm}
%  \ABNTifnotempty{\ABNTinstituicaodata}%
%    {%
%     \setlength{\parskip}{0cm}
%     {\instituicaoformat\ABNTinstituicaodata\par}
%     \setlength{\parskip}{.3cm}\par
%     
%    }
%\end{espacosimples}
%\end{center}
%\vfill\vfill
%\begin{center}
%  \ABNTifnotempty{\ABNTlocaldata}
%      {{\localformat\ABNTlocaldata}\par}
%    \ABNTifnotempty{\ABNTdatadata}
%      {{\dataformat\ABNTdatadata}}

%\end{center}
%\end{titlepage}
%}% end of \folhaderosto




%%%%%%%%%%%   abstract  %%%%%%%%%%%
% Ambiente para Abstract. Por default, coloca fonte de tamanho 10pt
% e com espaco simples entre linhas.

% Obs.: this code will be reimplemented for better LaTeX concept support
\newcommand{\ABNTabstractname}{Abstract}
\renewenvironment{abstract}%
  {%
   \if@openright\cleardoublepage\else\clearpage\fi%
   \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{abstract.}}{}
   \pretextualchapter{\ABNTabstractname}%
   \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{}}{}
   \begin{espacosimples}%
  }%
  {\end{espacosimples}\newpage}%abstract

%%%%%%%%%%%   resumo  %%%%%%%%%%%
% Ambiente para Resumo. O mesmo efeito do abstract, mas em portugues. 
%
\newcommand{\resumoname}{Resumo}
\newenvironment{resumo}%
  {%
   \if@openright\cleardoublepage\else\clearpage\fi%
   \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{resumo.}}{}
   \pretextualchapter{\resumoname}%
   \ifthenelse{\boolean{ABNThypertoc}}{\renewcommand{\chaptertype}{}}{}
   \begin{espacosimples}%
  }%
  {\end{espacosimples}\newpage}%abstract


%%%%%%% Folha de aprovacao %%%%%%%

% Command \assinatura for signature

% width of the line and text under the line
\newlength{\ABNTsignwidth}
\setlength{\ABNTsignwidth}{8cm}

% thickness of the line
\newlength{\ABNTsignthickness}
\setlength{\ABNTsignthickness}{0pt}

% ammount of space left between previous text and th signature line
\newlength{\ABNTsignskip}
\setlength{\ABNTsignskip}{2.5cm}

% \assinatura{name} -> types a line with name under the line, centralized
%
% \assinatura*{name} -> Creates the box with the line and name under
%     it, but the box has no position assigned. However the line and the
%     name are centralized with respect to each other.

\newcommand{\assinatura}{\@ifstar{\ABNTsign}{\ABNTcsign}}

\newcommand{\ABNTsign}[1]{%
  \parbox[t]{\ABNTsignwidth}{\espaco{simples}\vspace*{\ABNTsignskip}\centering%
  \rule{\ABNTsignwidth}{\ABNTsignthickness}\\%
  \nopagebreak #1\par}%
}

\newcommand{\ABNTcsign}[1]%
  {\begingroup\par\centering\ABNTsign{#1}\par\endgroup}

% environment "folhadeaprovacao" 
%   just clearpage correctly to twoside and openright compatibility
%
\newenvironment{folhadeaprovacao}%
  {\if@openright\cleardoublepage\else\clearpage\fi\begingroup}%
  {\endgroup\if@openright\cleardoublepage\else\clearpage\fi}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% I will no longer include List of Symbols in the wishlist for this class.


{\IfFileExists{helvetic.sty}%
{\RequirePackage{helvetic}}%
{\renewcommand{\rmdefault}{phv}}
%%%%% auto bold math (try follow bold face in text)

% plan: redefine commands that change font to bold to ALSO change math
% version; I don't change all commands that change font weight because I
% suppose this uses are local

\AtBeginDocument{
\ifthenelse{\boolean{ABNTautobm}\and\not\isundefined{\mv@bold}}%
 {%
  % \bfseries
  \let\ABNToldbfseries\bfseries\relax%
  \renewcommand{\bfseries}{\mathversion{bold}\ABNToldbfseries}%
  %
  % \textbf{}
  \let\ABNToldtextbf\textbf\relax%
  \renewcommand{\textbf}[1]{\ABNToldtextbf{\mathversion{bold}#1}}%
  %
  % \bf
  \let\ABNToldbf\bf\relax%
  \renewcommand{\bf}{\mathversion{bold}\ABNToldbf}%
  %
 }%
 {}%
}

%%%%%%    Indent code 

% indenting first paragraph of each section
\ifthenelse{\boolean{ABNTindentfirst}}%
 {\RequirePackage{indentfirst}}%
 {}

% paragraph indentation size and skip
\setlength{\parindent}{2cm}
\setlength{\parskip}{.25cm}


% logo
\newcommand{\abnTeX}{{\scshape a\kern-.13exb\kern-.13exn}\kern-.13ex\TeX}

%%% final message - announcement %%%%

\AtEndDocument{%
\newcommand{\spABNT}{\space\space\space\space\space\space\space\space}%
\typeout{+-------------------------------------------------------------------+}
\typeout{%
| Comentario, sugestao ou critica sobre o abnTeX? Entre em contato: |}%
\typeout{%
|\spABNT\spABNT\space\space
http://abntex.codigolivre.org.br\space\spABNT\spABNT|}%
%\typeout{%
%| Sua opiniao eh de grande ajuda para nos.\spABNT Ass: grupo abnTeX |}%
\typeout{+-------------------------------------------------------------------+}
}%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%  End of ABNT.CLS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


\let\oldchapter\chapter
\renewcommand{\chapter}[1]{\oldchapter{\thechapter \hspace{3mm} \MakeUppercase{#1}}}

\let\oldclearpage\clearpage
\renewcommand{\clearpage}{\oldclearpage{\espaco{1.5}}}

\endinput
