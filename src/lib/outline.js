// The book. Each section carries a `year` — reading order is chronological.
// Sequential page numbers (01, 02, …) are assigned after sort.
//
// Two reader tracks: 'mba' (decisions/payoffs lens) and 'cs' (data structures
// lens). gesture, body, and tldr are track-keyed objects { mba, cs }.
// eli5 is universal — always rendered, never tracked.
//
// Same chronology, two readings. Where a paper sits naturally in one camp,
// the other-track entry connects it to the reader's home field. The accidents
// of timing (1968: Knuth + Raiffa in the same year) are part of the argument.

const raw = [
  {
    title: 'Bernoulli and the value of a coin flip',
    year: 1738,
    gesture: {
      mba: 'A coin game with infinite expected payoff that no one will pay much to play breaks the idea that money equals value. Utility, not dollars, is what you maximize.',
      cs: 'The first formal acknowledgement that the score function the algorithm should optimize is not the obvious one. The objective is a transformation of the raw payoff — not the raw payoff itself.'
    },
    body: {
      mba: 'Daniel Bernoulli\'s *Specimen Theoriae Novae de Mensura Sortis* poses the St. Petersburg paradox — a gamble whose expected dollar payoff is infinite but which any sane person values at a few ducats — and resolves it by proposing that decision-makers maximize expected **utility**, with utility roughly logarithmic in wealth. Every later decision-analysis tree (the kind you fold back at decision and chance nodes) inherits this: payoffs at the leaves are *utilities*, not raw cash flows.',
      cs: 'Bernoulli describes a Monte Carlo construction (a doubling-payoff sequence ended by a tail) whose mean diverges, and shows that the rational policy still bounds the bid. The fix is to compose the score with a concave function before averaging. Read forward: a rollback over a decision tree maximizes expected `u(x)`, not expected `x`. The whole field of risk-aware optimization comes from taking that composition seriously.'
    },
    eli5: 'Imagine a game that on paper is worth infinity dollars, but no one would pay $20 to play. Bernoulli noticed that and said: people don\'t care about dollars, they care about how much those dollars matter to them. A second million dollars matters less than the first. That idea — value, not money — is the foundation of every formal model of choice that came after.',
    citation: 'D. Bernoulli, *Commentarii Academiae Scientiarum Imperialis Petropolitanae*, 1738. English translation in *Econometrica*, 22(1): 23–36, 1954.'
  },
  {
    title: 'Cayley names the tree',
    year: 1857,
    gesture: {
      mba: 'A British mathematician counting chemical isomers gives the diagram its name. After 1857, "tree" means a specific shape — connected, no loops back — and you can prove things about it.',
      cs: 'A connected acyclic graph. n^(n-2) labeled trees on n nodes. The first formal definition and the first counting result. Every later "what is a tree" pins to this paper.'
    },
    body: {
      mba: 'Arthur Cayley was enumerating saturated hydrocarbons and needed a vocabulary for the branching diagrams. He gave the shape its name — *tree* — and its definition: connected, no cycles. For the manager that comes later, this is the first time the diagram becomes a mathematical object you can reason about formally rather than just sketch on a napkin. Decision trees, org charts, and influence diagrams all sit downstream of this naming.',
      cs: 'Cayley defines a tree as a connected acyclic graph and proves what is now called Cayley\'s formula: there are exactly n^(n-2) distinct labeled trees on n vertices. The proof technique (Prüfer sequences come later, in 1918, as a clean bijection) becomes a workhorse of enumerative combinatorics. Every later combinatorial result on trees — number of binary search trees on n keys, number of plane trees, generating functions — traces back to this footing.'
    },
    eli5: 'A tree is a drawing of dots connected by lines where you can never walk in a circle. Cayley was the first person to write down the rules for what counts as one and to count how many different ones there are.',
    citation: 'A. Cayley, *Philosophical Magazine*, 13: 172–176, 1857.'
  },
  {
    title: 'König\'s lemma',
    year: 1936,
    gesture: {
      mba: 'If a problem has infinitely many possibilities but each step only gives you finitely many options, somewhere in that space there\'s a complete strategy that runs forever.',
      cs: 'Every infinite, finitely-branching tree contains an infinite path. The compactness lemma that underwrites half of computability and combinatorics.'
    },
    body: {
      mba: 'König\'s book *Theorie der endlichen und unendlichen Graphen* is the first systematic graph-theory textbook, and the lemma it makes famous says: if your tree of possibilities branches finitely at each step but goes on forever, at least one complete branch must extend to infinity. For the strategist, this is what justifies "if a long-horizon plan exists at all, we can find one by extending what works step by step." It\'s the formal warrant behind iterative planning and rolling-horizon decision policies.',
      cs: 'König\'s lemma — every infinite, finitely-branching tree contains an infinite path — is the compactness ingredient behind theorems you actually use: Brouwer\'s fan theorem, the proof that propositional satisfiability of a finitely-axiomatized infinite theory follows from finite satisfiability, and the standard argument that bounded-degree search spaces with infinitely many solutions have a complete one. In practice it\'s why iterative-deepening search is sound on infinite spaces.'
    },
    eli5: 'If a tree never stops growing, but at every spot it only splits into a few new branches, then at least one branch must go on forever. Sounds obvious — but pinning it down lets mathematicians prove that certain kinds of searches will always find what they\'re looking for if it exists.',
    citation: 'D. König, *Theorie der endlichen und unendlichen Graphen*, Akademische Verlagsgesellschaft, 1936.'
  },
  {
    title: 'von Neumann–Morgenstern utility',
    year: 1944,
    gesture: {
      mba: 'Four common-sense rules about how you compare gambles force the existence of a hidden score you\'re trying to maximize on average. Decision theory becomes math.',
      cs: 'A representation theorem: preferences satisfying four axioms admit a real-valued utility function unique up to positive affine transformation. The objective function isn\'t a choice — it\'s a consequence.'
    },
    body: {
      mba: 'In *Theory of Games and Economic Behavior*, von Neumann and Morgenstern prove that any decision-maker whose preferences satisfy four axioms (completeness, transitivity, continuity, independence) behaves *as if* maximizing expected utility for some utility function. The utility is unique up to scaling and shifting — the *ratios of differences* are what matter, not the absolute numbers. This is the axiomatic foundation under every later expected-utility model in decision analysis, finance, and economics.',
      cs: 'A representation theorem with teeth: from four axioms on a preference relation over lotteries, derive a real-valued `u: Outcomes → R` such that lottery `L1 ≼ L2 ⇔ E[u(L1)] ≤ E[u(L2)]`. Uniqueness up to positive affine transformation. Read it as: if your loss function over an MDP is *consistent* in the right sense, the loss function exists — you don\'t get to pick whether to use one. You get to pick its calibration.'
    },
    eli5: 'If you follow four common-sense rules about how you compare gambles — like "if A beats B and B beats C then A beats C" — then there has to be some hidden score in your head you\'re trying to maximize on average. You don\'t have to know the score; the math says it must exist. That hidden score is called utility.',
    citation: 'J. von Neumann & O. Morgenstern, *Theory of Games and Economic Behavior*, Princeton University Press, 1944.'
  },
  {
    title: 'Savage and personal probability',
    year: 1954,
    gesture: {
      mba: 'When the odds aren\'t given to you — and in the real world they never are — your consistent choices reveal odds you must already be assigning. Subjective probability, made formal.',
      cs: 'Without an objective probability measure, a stronger axiom set still derives both a utility and a probability, jointly. The Bayesian decision-theoretic foundation.'
    },
    body: {
      mba: 'Savage\'s *The Foundations of Statistics* extends von Neumann–Morgenstern to the realistic case where probabilities aren\'t handed to you. Under a stronger axiom set (the Sure-Thing Principle being the famous one), a decision-maker acts as if they have **both** a personal probability distribution over states of the world and a utility function over outcomes — and they maximize subjective expected utility. This is the philosophical home of every Bayesian analysis in business school: "your prior is whatever your behavior already implies."',
      cs: 'Savage\'s representation theorem jointly derives a probability measure `P` and a utility `u` from a preference relation over acts (functions from states to outcomes). The Sure-Thing Principle is the axiom doing the work — the analog of the conditional-independence assumption in graphical models. Bayesian decision theory is *applied Savage*: every loss-minimizing classifier is implementing a Savage-style act over an inferred posterior.'
    },
    eli5: 'The earlier theory needed someone to hand you the odds. Savage said: in real life nobody hands you odds, but if your choices are consistent in certain ways, then you must already be acting as if you had odds in your head. So we can treat your behavior as a probability — your probability — and do math with it.',
    citation: 'L. J. Savage, *The Foundations of Statistics*, Wiley, 1954.'
  },
  {
    title: 'AVL: the first balanced tree',
    year: 1962,
    gesture: {
      mba: 'A self-correcting filing system. Every time you add a record, the system rearranges itself so no branch ever gets much taller than its sibling. Search stays fast forever.',
      cs: 'Two Soviet mathematicians prove you can keep a binary search tree shallow under arbitrary insertion sequences using only constant-time rotations. First self-balancing BST.'
    },
    body: {
      mba: 'A search tree that\'s gone lopsided is the database equivalent of a filing cabinet where one drawer holds 90% of the folders. Lookups walk that long drawer. Adelson-Velsky and Landis figured out the recipe — *AVL tree* — for keeping the cabinet balanced as you add records: after every insert, do a small local rearrangement so no branch ever gets much taller than its sibling. For the operator, this is why your customer-record search took 5ms in 1990 and still takes 5ms today even with a thousand times more customers.',
      cs: 'The AVL invariant: heights of the two subtrees of every node differ by at most 1, restored after each insert/delete via O(1) rotations along the search path. Total work O(log n). The first self-balancing BST and the first published proof that ordered dictionary operations could simultaneously be O(log n) on dynamic data. Slightly stricter balance than red-black trees (which arrive sixteen years later) — fewer rotations on lookup-heavy workloads, more on insert-heavy.'
    },
    eli5: 'A search tree gets slow if it grows lopsided — long skinny branches mean you have to walk down a long list to find anything. AVL was the first recipe for keeping the tree balanced as it grows: after every change, do a small rearrangement so no branch ever gets much taller than its sibling. Searching stays fast forever.',
    citation: 'G. Adelson-Velsky & E. Landis, *Doklady Akademii Nauk SSSR*, 146: 263–266, 1962.'
  },
  {
    title: 'Magee puts the tree in HBR',
    year: 1964,
    gesture: {
      mba: 'Squares for choices, circles for chance, payoffs at the leaves. Two HBR articles take an academic idea and put it inside every MBA syllabus.',
      cs: 'Decision trees, but for capital budgeting instead of game-playing. Same fold-back algorithm — `max` at decision nodes, `Σ p·u` at chance nodes — applied to a different domain.'
    },
    body: {
      mba: 'John Magee published back-to-back *Harvard Business Review* articles in 1964: *Decision Trees for Decision Making* (July) and *How to Use Decision Trees in Capital Investment* (September). He nailed the now-standard notation — squares for decision nodes, circles for chance nodes, payoffs at terminals — and worked the canonical oil-drilling example. These articles are why the decision tree is in every MBA core class today; Magee translated Howard\'s and Raiffa\'s academic apparatus into the language of plant managers and capital committees.',
      cs: 'Magee\'s decision tree is structurally identical to a search tree with two kinds of internal node: `max` nodes (your move) and *expectation* nodes (nature\'s move, weighted by probability). The fold-back algorithm — visit children, take the max at decision nodes, take the probability-weighted average at chance nodes — is what later AI calls **expectimax**. Same tree, same dynamic-programming recurrence, different field. The 1964 HBR articles are the first major appearance of this algorithm outside of game theory.'
    },
    eli5: 'Two short magazine articles in 1964 took an academic idea — diagrams of decisions and chance with numbers attached — and showed managers how to use them on real money decisions like "should we drill here." The drawing they used became the textbook drawing. Most MBAs still learn it from a near-copy of Magee\'s example.',
    citation: 'J. F. Magee, *Harvard Business Review*, 42(4): 126–138 and 42(5): 79–96, 1964.'
  },
  {
    title: 'Howard names decision analysis',
    year: 1966,
    gesture: {
      mba: 'A Stanford engineer borrows from operations research and statistics and stamps the field with a name. After 1966, "decision analysis" is a profession.',
      cs: 'The field gets a research program and a PhD pipeline. Decision-theoretic methods become a discipline with its own conferences, journals, and software.'
    },
    body: {
      mba: 'Ronald Howard\'s 1966 talk *Decision Analysis: Applied Decision Theory* gives the field its name and frames it as a normative engineering discipline: take messy real choices, structure them as trees or diagrams, elicit probabilities and utilities from the decision-maker, compute the recommended action. Howard founds the first decision-analysis PhD program at Stanford; his graduates fan out into the industries — oil & gas, pharma, defense — where decision analysis becomes consulting practice.',
      cs: 'Howard isn\'t the inventor of decision theory but he\'s the field-shaper. He\'s the bridge from Bellman-style operations research to applied probabilistic-graphical-model thinking. The line from Howard\'s 1966 framing to influence diagrams (1981, Howard & Matheson) to Bayesian networks (Pearl 1988) is direct — the same engineering methodology, increasingly automated by graph algorithms instead of hand-rolled by analysts.'
    },
    eli5: 'Howard didn\'t invent the math, but he gave the field its name and treated it like engineering — a clear process you can teach and apply to any real-world decision, from drug development to oil exploration. After Howard, "decision analysis" meant a specific way of working, not just a vague idea.',
    citation: 'R. A. Howard, in *Proceedings of the Fourth International Conference on Operational Research*, Wiley, 1966.'
  },
  {
    title: 'Knuth, volume one',
    year: 1968,
    gesture: {
      mba: 'A textbook that turns "tree" into a teachable subject. After 1968, every CS undergrad has the same vocabulary for the same shapes — and that vocabulary leaks into business analytics decades later.',
      cs: 'The canonical formal treatment. Section 2.3: rooted, ordered, free, binary; preorder/postorder/inorder; threaded representations. Anyone who later writes about trees in CS is writing in dialogue with Knuth.'
    },
    body: {
      mba: 'Donald Knuth\'s *The Art of Computer Programming, Volume 1* is the textbook that took scattered tree material — papers, folklore, isolated tricks — and unified it into a teachable subject. The vocabulary every analyst still uses ("preorder", "leaf", "root", "branching factor") was settled here. The reason this matters in a business context: when your data team builds a hierarchical model in Tableau or trains a gradient-boosted decision tree on customer churn, they\'re using Knuth\'s words for a Magee-shaped object.',
      cs: 'Section 2.3 of Knuth\'s *Fundamental Algorithms* is the canonical formal treatment of trees: rooted, ordered, free, binary; preorder/inorder/postorder traversal; threaded representations for in-place traversal without recursion; the conversion between general trees and binary trees via the natural correspondence. The bibliography is the field\'s induction. Every textbook on data structures since 1968 is, structurally, a re-presentation of this chapter for a different audience.'
    },
    eli5: 'Before Knuth, a lot of tree material was scattered across papers and folklore. He wrote it down in one place, with consistent words and pictures, so a student could learn it the same way twice. The vocabulary he chose ("preorder", "leaf", "root") is still the vocabulary now.',
    citation: 'D. E. Knuth, *The Art of Computer Programming, Volume 1: Fundamental Algorithms*, Addison-Wesley, 1968.'
  },
  {
    title: 'Raiffa\'s textbook',
    year: 1968,
    gesture: {
      mba: 'The book that taught a generation of MBAs to draw the tree, fold it back, and compute the value of perfect information. Same year as Knuth — different shelf, same shape.',
      cs: 'A graphical algorithm textbook for non-CS audiences. Same dynamic-programming recurrence Knuth was systematizing, written as a manual for managers and policy analysts.'
    },
    body: {
      mba: 'Howard Raiffa\'s *Decision Analysis: Introductory Lectures on Choices Under Uncertainty* puts the field on Harvard Business School syllabi (and from there, on every MBA program). Raiffa walks readers through tree construction, **fold-back** (rollback), **expected value of perfect information** (EVPI — what would it be worth to know the answer in advance?), expected value of sample information, and sensitivity analysis. Breezy where Savage was forbidding — it\'s what most MBA programs still teach from in spirit. EVPI is the killer concept the textbook drills: it tells you whether a study or pilot is worth running before you run it.',
      cs: 'Raiffa\'s book is, in algorithmic terms, an exposition of post-order tree DP for laypeople. The fold-back recurrence — `value(node) = max over decisions of (immediate_cost + Σ p · value(child))` — is the same Bellman recurrence used in MDPs, presented graphically. EVPI is `E[max over decisions | full info] − max over decisions of E[value | prior]`, which is the definitional gap that justifies active learning and value-of-information bounds in modern reinforcement learning.'
    },
    eli5: 'Raiffa took the dense academic stuff from Savage, von Neumann, and Morgenstern and wrote a friendly textbook a manager could read. He taught how to draw the diagram, work backwards from the payoffs to find the best path, and figure out how much it would be worth to know the answer in advance. That last idea — "what is information worth?" — is what makes the technique pay for itself.',
    citation: 'H. Raiffa, *Decision Analysis: Introductory Lectures on Choices Under Uncertainty*, Addison-Wesley, 1968.'
  },
  {
    title: 'Bayer & McCreight: the B-tree',
    year: 1972,
    gesture: {
      mba: 'A search tree engineered for the disk, not the CPU. The reason your customer database can find a record among a billion in milliseconds.',
      cs: 'A balanced search tree where every internal node holds many keys and many children — fan-out tuned to a disk page. Three or four I/Os, not thirty.'
    },
    body: {
      mba: 'Bayer and McCreight, working at Boeing Scientific Research Labs, published the **B-tree**: a balanced search tree where each node holds many keys at once, and the size of a node is matched to the size of one disk read. A lookup in a billion-record index touches three or four pages instead of thirty. This is the structure under every relational database table you\'ve ever queried — Postgres, MySQL, Oracle, SQL Server. When the COO asks why the CRM stays fast at 10× the customer count, the answer is "B-trees" whether anyone says the word out loud or not.',
      cs: 'A B-tree of order m: every internal node has between ⌈m/2⌉ and m children; all leaves at the same depth; height ≤ log_⌈m/2⌉(n). Insertion splits full nodes on the way up; deletion merges underfull nodes on the way up. The fan-out is chosen so a node fills exactly one disk page (~8KB → m ≈ 200 for 32-byte keys), making the tree only 3–4 levels deep at billions of keys. Almost every on-disk index in the world uses a B-tree or its B+-variant.'
    },
    eli5: 'A regular search tree splits in two at every level, which is fine in memory but terrible on a hard drive — every step costs a slow disk read. Bayer & McCreight made each node fat: it holds many keys and points to many children, so one disk read narrows the search a lot. That tiny insight — match the tree shape to how disks actually work — is the reason databases can search billions of records in milliseconds.',
    citation: 'R. Bayer & E. M. McCreight, *Acta Informatica*, 1(3): 173–189, 1972.'
  },
  {
    title: 'Bentley\'s k-d tree',
    year: 1975,
    gesture: {
      mba: 'The data structure under every "find the nearest store" feature. A binary tree that splits geography one axis at a time and answers spatial queries fast.',
      cs: 'A binary tree alternating splitting axes by depth — partitions k-dimensional space into nested boxes. O(log n) average for nearest-neighbor and range queries.'
    },
    body: {
      mba: 'Jon Bentley publishes the **k-d tree** — a binary tree that recursively splits space by alternating axes. For "find the closest store/customer/sensor" queries on a million points, this turns an O(n) scan into an O(log n) walk. Every "nearby" feature in a consumer app, every store-locator, every routing-aware ad bid, every k-NN classifier in a marketing analytics platform — k-d trees or their descendants are doing the work underneath. It is, alongside the B-tree, one of the two index structures that made spatial business analytics viable.',
      cs: 'k-d tree: at depth d, split on axis d mod k. Insert by descending and placing at a leaf; query by descending into the side containing the target, then checking whether the bounding-axis distance is less than the best-so-far before pruning the other subtree. Worst case O(n^(1−1/k)) for nearest-neighbor in k dimensions but excellent in low dimensions; degrades for high-dimensional data, which is why ball trees, vp-trees, and locality-sensitive hashing follow.'
    },
    eli5: 'If you have a million points scattered on a map and want the one nearest your finger, scanning all million is too slow. Bentley\'s trick: chop the map in half left-right, then chop each half top-bottom, then left-right again, recursively. Now finding the nearest point is a walk down the tree. This is the idea behind a lot of "nearby" features in software.',
    citation: 'J. L. Bentley, *Communications of the ACM*, 18(9): 509–517, 1975.'
  },
  {
    title: 'Keeney & Raiffa: many objectives',
    year: 1976,
    gesture: {
      mba: 'When payoff isn\'t one number — cost AND time AND lives AND reputation — utility has to learn how to add. Multi-attribute utility theory.',
      cs: 'Vector-valued payoffs at the leaves, scalarized via a multi-attribute utility function. The book formalizes when the scalarization is additive and when it has to be multiplicative.'
    },
    body: {
      mba: 'Keeney & Raiffa\'s *Decisions with Multiple Objectives* formalizes multi-attribute utility theory (MAUT). When a decision\'s payoff is a vector — cost, schedule, environmental impact, reputation — they show how to combine separate utility functions over each attribute into one overall utility, given preferential and utility independence assumptions. They also work out how to *interview* the decision-maker to learn the weights. Used by EPA, FDA, NASA, and any corporate strategy team where "the right answer" can\'t be reduced to dollars.',
      cs: 'MAUT formalizes when the joint utility `U(x1,...,xk)` is decomposable into single-attribute utilities. Under preferential independence, additive form: `U = Σ wi · ui(xi)`. Under utility independence, multiplicative form. The independence conditions are testable via specific lottery comparisons. This is the pre-graphical-models version of the conditional-independence factorizations that later show up in Bayesian networks and MRF inference.'
    },
    eli5: 'A lot of real decisions can\'t be turned into a single dollar number — building a hospital is about cost AND lives saved AND wait times. Keeney and Raiffa worked out the rules for combining several yardsticks into one decision, including how to ask people the right questions to learn how they trade those yardsticks against each other.',
    citation: 'R. L. Keeney & H. Raiffa, *Decisions with Multiple Objectives: Preferences and Value Tradeoffs*, Wiley, 1976.'
  },
  {
    title: 'Red-black trees',
    year: 1978,
    gesture: {
      mba: 'The balanced tree quietly inside every standard library you use without knowing. When `std::map` or `TreeMap` keeps your sorted data fast, it\'s a red-black tree underneath.',
      cs: 'A binary search tree dressed as a 2-3-4 tree wearing two colors. Two invariants bound height at 2 log(n+1). The workhorse balanced BST of every standard library.'
    },
    body: {
      mba: 'Guibas and Sedgewick\'s **red-black tree** is the balanced search structure inside `std::map` (C++), `TreeMap` (Java), `SortedDictionary` (.NET), and most ordered-map types your engineers reach for. Looser balance than AVL, but easier to implement correctly — and that practical edge is why it\'s the one in production. From the manager\'s side, the lesson is meta: the data structure that "wins" isn\'t the theoretically tightest, it\'s the one easy enough to build right that everyone defaults to it.',
      cs: 'Red-black trees: each node is colored red or black; root is black; no red node has a red parent; every root-to-leaf path has the same number of black nodes. Insertions and deletions restore the invariants via O(1) rotations and recolorings, total O(log n) work. Guibas and Sedgewick prove the structure is isomorphic to a 2-3-4 tree — every red edge is "the second key in a 3-node" — which is what makes the rebalancing reasoning tractable.'
    },
    eli5: 'Red-black trees are the practical workhorse balanced tree — slightly looser balance than AVL, but easier to code right, and that\'s why they\'re inside the standard library you used today without knowing. The colors are bookkeeping: they tell the algorithm where it needs to do a small fix-up after each change.',
    citation: 'L. J. Guibas & R. Sedgewick, *Proceedings of the 19th Annual Symposium on Foundations of Computer Science*, 8–21, 1978.'
  },
  {
    title: 'Comer: the ubiquitous B-tree',
    year: 1979,
    gesture: {
      mba: 'A survey paper that names the variant — B+ tree — that almost every real database actually uses. If you\'ve ever scanned a date range in SQL, you used one.',
      cs: 'B+ tree: data only at the leaves, leaves linked into a sequence. Fast point lookup AND efficient range scan. The structure under every relational engine.'
    },
    body: {
      mba: "Douglas Comer's *The Ubiquitous B-Tree* in *ACM Computing Surveys* doesn't introduce a new tree — it tells everyone honestly which variant they should actually use. The **B+ tree** keeps all the real data in the leaves and links the leaves into a sorted sequence. That gives you both fast point lookups (down the tree) AND efficient range scans (across the linked leaves). Every range query you've written — `WHERE date BETWEEN '2026-01-01' AND '2026-03-31'` — runs over a B+ tree.",
      cs: 'B+ tree: internal nodes store only keys (as a directory); all values live in leaves; leaves are linked left-to-right in sorted order. Range queries become "descend to lower bound, walk the leaf chain to upper bound" — O(log n + k) for k results, no random I/O after the initial descent. This linked-leaf detail is the difference between a usable database index and a toy. Comer\'s survey is also where the B/B+/B*-tree taxonomy gets pinned down.'
    },
    eli5: 'Comer\'s contribution wasn\'t a new tree — it was telling everyone honestly which variant of B-tree they should actually use, and why. The B+ tree puts all the real data at the bottom and leaves the inside of the tree as a fast directory. That\'s the design every database since has used for its main index.',
    citation: 'D. Comer, *ACM Computing Surveys*, 11(2): 121–137, 1979.'
  },
  {
    title: 'Influence diagrams',
    year: 1981,
    gesture: {
      mba: 'Decision trees explode combinatorially — three decisions and five chance events each is thousands of leaves. Influence diagrams compress the same problem into a picture you can read.',
      cs: 'A directed acyclic graph with three node types (decision, chance, value) and arcs encoding dependence. Compiles down to a tree for solving but stays compact while authoring. Direct ancestor of Bayesian networks.'
    },
    body: {
      mba: 'Howard and Matheson formalize **influence diagrams** as a graphical alternative to decision trees. Same problem, much more compact picture: nodes are decisions (squares), uncertainties (ovals), and value (diamond); arcs show what depends on what. Where a decision tree would enumerate every path, the influence diagram shows the *structure* — and the computer expands it into a tree for solving. For real corporate decisions with many uncertainties, this is what makes the diagram still readable on a single page.',
      cs: 'An influence diagram is a directed acyclic graph with decision nodes (D), chance nodes (C), and a single value node (V). Arcs into chance nodes are conditional-probability dependencies (the parent set is the conditioning set); arcs into decision nodes are *information* arcs (what is known when the decision is made); arcs into V identify the value-determining variables. Solution algorithms (Shachter\'s arc-reversal, 1986) reduce the graph by node-elimination operations until only V remains. Pearl\'s Bayesian networks (1988) are the same DAG-of-conditional-distributions idea minus the decision and value nodes.'
    },
    eli5: 'Decision trees get unreadable fast — three decisions with five chance events each is a tree with thousands of leaves. Howard and Matheson invented a tidier picture: just the variables and arrows showing what depends on what. The computer can still expand it into a tree under the hood, but a human can actually look at the picture and understand the problem.',
    citation: 'R. A. Howard & J. E. Matheson, in *Readings on the Principles and Applications of Decision Analysis*, 1981. Reprinted in *Decision Analysis*, 2(3): 127–143, 2005.'
  },
  {
    title: 'Guttman\'s R-tree',
    year: 1984,
    gesture: {
      mba: 'A B-tree shaped for rectangles. Every map app finds what\'s on screen in milliseconds because someone in 1984 figured out how to index 2-D objects.',
      cs: 'R-tree: each internal node stores the bounding box of its children, and queries prune subtrees whose bounding box doesn\'t intersect the search region. Spatial indexing, generalized.'
    },
    body: {
      mba: 'Antonin Guttman generalizes the B-tree to k-dimensional rectangles. R-trees power the spatial indexes in PostGIS, MongoDB, SQLite\'s R*Tree module, Oracle Spatial, and basically every GIS system. When your dispatch app finds the three nearest drivers, when your real-estate app fills the visible map with listings, when your IoT platform finds sensors inside a geofence — the query plan walks an R-tree.',
      cs: 'R-tree: each internal node stores up to m entries, each entry being a bounding rectangle and a child pointer; a query rectangle Q descends only into children whose MBR (minimum bounding rectangle) intersects Q. Like B-trees, balanced and disk-paged. Variants — R*-tree (1990), Hilbert R-tree (1994) — improve clustering by changing the insertion heuristic. The fundamental tradeoff: deeper coverage overlap means more subtree exploration on query.'
    },
    eli5: 'A B-tree is great for sorted keys, but on a map there\'s no single sort order that helps. Guttman wrapped each cluster of map objects in a bounding box, then wrapped clusters of boxes in bigger boxes, recursively. To find what\'s on screen you only walk into boxes that overlap your screen. That\'s how a map app stays fast at every zoom level.',
    citation: 'A. Guttman, *Proceedings of the ACM SIGMOD International Conference on Management of Data*, 47–57, 1984.'
  },
  {
    title: 'Clemen: making hard decisions',
    year: 1996,
    gesture: {
      mba: 'The textbook that quietly replaced Raiffa as the MBA standard — same substance, modern software, sensitivity charts your CFO recognizes.',
      cs: 'A practitioner\'s manual for Monte Carlo over decision trees. Probability assessment, simulation, sensitivity analysis, value of information — the engineering workflow.'
    },
    body: {
      mba: 'Robert Clemen\'s *Making Hard Decisions* (later co-authored with Terence Reilly) is the modern MBA decision-analysis textbook. It covers the Raiffa material — structuring, fold-back, EVPI, sensitivity — paired with Excel/Crystal Ball/Precision Tree walkthroughs that students can actually run. If your school has a decision-analysis class today, this is probably the book.',
      cs: 'Clemen\'s textbook is the bridge from Raiffa\'s 1968 hand-computation style to modern probabilistic-software workflows. Probability elicitation methods (the equivalent-lottery technique), Monte Carlo over input distributions, tornado diagrams for one-way sensitivity, two-way sensitivity heatmaps. The engineering practices it codifies — propagate distributions, not point estimates; identify dominant uncertainties before deepening the tree — translate directly to modern probabilistic programming and uncertainty quantification.'
    },
    eli5: 'Clemen\'s book is the modern teaching version of Raiffa\'s — same ideas, but with examples a current MBA student recognizes (real businesses, simulation software, sensitivity charts). If your school has a decision analysis class today, this is probably the book.',
    citation: 'R. T. Clemen, *Making Hard Decisions: An Introduction to Decision Analysis*, Duxbury Press, 1st ed. 1991, 2nd ed. 1996.'
  },
  {
    title: 'LSM-tree',
    year: 1996,
    gesture: {
      mba: 'A storage tree shaped for write-heavy workloads. Why your logging platform, time-series database, and chat history can ingest a million events a second without breaking.',
      cs: 'Buffer in memory, sweep to disk in sorted batches, merge in the background. Trade some read latency for an order of magnitude more write throughput.'
    },
    body: {
      mba: 'Patrick O\'Neil and colleagues publish the **Log-Structured Merge-Tree** (LSM-tree). Where B-trees update pages in place — costly under heavy writes — LSM-trees append new keys to a memory buffer, flush sorted runs to disk when full, and merge runs in the background. LevelDB, RocksDB, Cassandra, HBase, ScyllaDB, and most modern key-value/time-series stores use LSM-trees. If your business runs on a write-heavy workload (event logs, IoT telemetry, chat, ads serving), an LSM-tree is the reason it scales.',
      cs: 'LSM-tree: writes go to an in-memory `memtable` (typically a skip list or red-black tree); when full, flushed as an immutable sorted run on disk (`SSTable`). Background compaction merges runs across levels (level 0 → 1 → 2 …) with size ratios; reads consult memtable plus all levels (Bloom filters skip files that can\'t contain the key). Trades read amplification (multiple files per lookup) and space amplification (during compaction) for an order-of-magnitude write-throughput gain. The fundamental insight: random writes are catastrophic on disk; sequential writes are cheap; pay the merge cost asynchronously.'
    },
    eli5: 'B-trees are great when you mostly read. But if you\'re writing constantly — like a logging system — every write has to go find the right spot in the tree, which is slow. LSM-trees flip the strategy: write to memory fast, dump to disk later in big sorted batches, and clean up in the background. That\'s why most modern "write a lot, read sometimes" databases (logs, time-series, key-value) use them.',
    citation: 'P. O\'Neil, E. Cheng, D. Gawlick & E. O\'Neil, *Acta Informatica*, 33(4): 351–385, 1996.'
  },
  {
    title: 'Smart Choices: PrOACT',
    year: 1999,
    gesture: {
      mba: 'The framework boiled to five letters so a manager can run it on a napkin: Problem, Objectives, Alternatives, Consequences, Tradeoffs.',
      cs: 'A pseudo-code-for-managers compression of decades of decision theory. The five-step algorithm anyone can run without software.'
    },
    body: {
      mba: 'Hammond, Keeney, and Raiffa — three of the field\'s founders — write a thin paperback for managers, not academics. They distill the apparatus into the **PrOACT** framework: state the **P**roblem clearly, list real **O**bjectives, brainstorm **A**lternatives, estimate **C**onsequences, own the **T**radeoffs. The second half catalogs the psychological traps (anchoring, sunk cost, overconfidence, status-quo bias) that derail real decisions. It is widely assigned in MBA cores and executive programs, and at 250 pages it\'s the trade-paperback decision analysis canon.',
      cs: 'PrOACT is the algorithm in pseudocode for non-engineers: define the problem space (what state am I optimizing in?), enumerate the objective vector, generate candidates, estimate consequences (forward simulation), expose the dominated and the Pareto-frontier alternatives. The second half is essentially a list of cognitive failure modes that violate the von Neumann–Morgenstern axioms in practice — empirical evidence that the rationality theorems of 1944/1954 are aspirational, not descriptive.'
    },
    eli5: 'Three of the field\'s founders wrote a thin paperback for managers, not academics. They compressed the whole apparatus into five steps you can do on the back of a napkin: clearly state the Problem, list your real Objectives, brainstorm Alternatives, estimate Consequences, and own the Tradeoffs. Then a second half about how your brain will trick you out of doing it right.',
    citation: 'J. S. Hammond, R. L. Keeney & H. Raiffa, *Smart Choices: A Practical Guide to Making Better Decisions*, Harvard Business School Press, 1999.'
  }
];

export const flat = raw
  .map((s) => ({ ...s }))
  .sort((a, b) => a.year - b.year)
  .map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0'), orderIndex: i }));

export const YEAR_MIN = Math.min(...flat.map((s) => s.year));
export const YEAR_MAX = Math.max(...flat.map((s) => s.year));

export function next(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i >= 0 && i < flat.length - 1 ? flat[i + 1] : null;
}

export function prev(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i > 0 ? flat[i - 1] : null;
}
